/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useRef, useEffect } from "react";
import Navbar from "../../../components/Navbar";
import TableHeaderReport from "../../../ui/TableHeaderReport";
import TableContent from "../../../ui/TableContent";
import html2pdf from "html2pdf.js";
import * as XLSX from "xlsx";
import useDataEntryHooks from "../../../hooks/DataEntryHooks";
import { useAuth } from "../../../context/AuthContext";
import LoadingSpinner from "../../../ui/LoadingSpinner";
import { Navigate } from "react-router-dom";

export default function PokjaHasilPenjabatPengadaan() {
    const [tahun, setTahun] = useState('');
    const [metodePengadaan, setMetodePengadaan] = useState('');
    const [sumberDana, setSumberDana] = useState('');
    const tableRef = useRef<HTMLDivElement>(null);
    const { dataEntryPengadaan, sumberDanaOptions, metodePengadaanOptions, tahunOptions } = useDataEntryHooks();
    const [dataEntryFilter, setDataEntryFilter] = useState<DataEntryProps[]>([]);
    const { user, loading } = useAuth();

    const columns = [
        {
            key: 'id',
            label: 'No'
        },
        {
            key: 'opd',
            label: 'OPD'
        },
        {
            key: 'nama_paket',
            label: 'Nama Paket'
        },
        {
            key: 'metode_pengadaan',
            label: 'Metode Pengadaan'
        },
        {
            key: 'nilai_pagu',
            label: 'Nilai Pagu'
        },
        {
            key: 'nilai_hps',
            label: 'Nilai HPS'
        },
        {
            key: 'pemenang',
            label: 'Pemenang'
        },
        {
            key: 'nilai_penawaran',
            label: 'Nilai Penawaran'
        },
        {
            key: 'nilai_negosiasi',
            label: 'Nilai Negosiasi'
        },
        {
            key: 'tanggal_masuk',
            label: 'No & Tanggal'
        },
        {
            key: 'efisience',
            label: 'Efisiensi Nilai Pagu-Kontrak'
        },
        {
            key: 'presentation',
            label: 'presentase'
        },
    ];

    useEffect(() => {
        const filteringDataEntry = () => {
            const dataFilter = dataEntryPengadaan?.filter((item: DataEntryProps) => {
                const filterType = item?.tipe?.includes("Penjabat");
                const tahunFilter = tahun
                    ? item?.tahun_anggaran?.toString().includes(tahun)
                    : true;

                const metodeFilter = metodePengadaan
                    ? item?.metode_pengadaan === metodePengadaan
                    : true;

                const sumberDanaFilter = sumberDana
                    ? item?.sumber_dana === sumberDana
                    : true;

                return filterType && tahunFilter && metodeFilter && sumberDanaFilter;;
            });

            setDataEntryFilter(dataFilter);
        }

        filteringDataEntry();
    }, [dataEntryPengadaan, tahun, metodePengadaan, sumberDana]);

    const generateTableHTML = () => {
        const thead = `
        <tr>
            ${columns.map(col => `<th>${col.label}</th>`).join("")}
        </tr>
    `;

        const tbody = dataEntryFilter.map(row => `
        <tr>
            ${columns.map(col => `<td>${(row as Record<string, any>)[col.key] ?? ""}</td>`).join("")}
        </tr>
    `).join("");

        return `
        <table>
            <thead>${thead}</thead>
            <tbody>${tbody}</tbody>
        </table>
    `;
    };

    const handlePrint = () => {
        const printWindow = window.open("", "", "width=1400,height=900");

        if (!printWindow) return;

        printWindow.document.write(`
        <html>
            <head>
                <title>Laporan Pengadaan</title>
                <style>
                    body {
                        font-family: Arial, sans-serif;
                        padding: 20px;
                    }
                    table {
                        width: 100%;
                        border-collapse: collapse;
                        font-size: 11px;
                    }
                    th, td {
                        border: 1px solid #000;
                        padding: 6px;
                        vertical-align: top;
                    }
                    th {
                        background: #eaeaea;
                        text-align: center;
                    }
                </style>
            </head>
            <body>
                <h3 style="text-align:center;">Laporan Transaksi Pengadaan</h3>
                ${generateTableHTML()}
            </body>
        </html>
    `);

        printWindow.document.close();
        printWindow.focus();
        printWindow.print();
    };

    const handleSavePDF = () => {
        const element = document.createElement("div");

        element.innerHTML = `
        <style>
            table {
                width: 100%;
                border-collapse: collapse;
                font-size: 10px;
            }
            th, td {
                border: 1px solid #000;
                padding: 6px;
            }
            th {
                background: #eaeaea;
            }
        </style>
        <h3 style="text-align:center; margin-bottom: 40px;">Laporan Transaksi Pengadaan</h3>
        ${generateTableHTML()}
    `;

        html2pdf()
            .set({
                margin: 0.5,
                filename: "laporan-penjabat-pengadaan.pdf",
                html2canvas: { scale: 2 },
                jsPDF: {
                    unit: "in",
                    format: "a4",
                    orientation: "landscape",
                },
            })
            .from(element)
            .save();
    };

    const handleSaveExcel = () => {
        const worksheetData = [
            columns.map(col => col.label),
            ...dataEntryFilter.map(row => columns.map(col => (row as Record<string, any>)[col.key] ?? "")),
        ];

        const worksheet = XLSX.utils.aoa_to_sheet(worksheetData);

        const range = XLSX.utils.decode_range(worksheet["!ref"]!);

        for (let R = range.s.r; R <= range.e.r; ++R) {
            for (let C = range.s.c; C <= range.e.c; ++C) {
                const cellRef = XLSX.utils.encode_cell({ r: R, c: C });
                if (!worksheet[cellRef]) continue;

                worksheet[cellRef].s = {
                    border: {
                        top: { style: "thin" },
                        bottom: { style: "thin" },
                        left: { style: "thin" },
                        right: { style: "thin" },
                    },
                    alignment: {
                        vertical: "center",
                        horizontal: R === 0 ? "center" : "left",
                    },
                    font: R === 0 ? { bold: true } : {},
                };
            }
        }

        worksheet["!cols"] = columns.map(() => ({ wch: 25 }));

        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Laporan Pengadaan");

        XLSX.writeFile(workbook, "laporan-penjabat-pengadaan.xlsx");
    };

    if (loading) {
        return <LoadingSpinner />
    }

    if (!user || (user.role.name != "kepala bagian" && user.role.name != "kepala biro")) {
        return <Navigate to="/" replace />
    }

    return (
        <div>
            <Navbar />

            <div className="pt-24" data-aos="fade-up" data-aos-duration="1000">
                <TableHeaderReport
                    title="DAFTAR PAKET PROSES PEMILIHAN PENYEDIA BARANG/JASA PENJABAT PENGADAAN"
                    tahunOptions={tahunOptions}
                    metodePengadaanOptions={metodePengadaanOptions}
                    sumberDanaOptions={sumberDanaOptions}
                    selectedTahun={tahun}
                    selectedMetodePengadaan={metodePengadaan}
                    selectedSumberDana={sumberDana}
                    onTahunChange={setTahun}
                    onMetodePengadaanChange={setMetodePengadaan}
                    onSumberDanaChange={setSumberDana}
                    onPrint={() => handlePrint()}
                    onSavePDF={() => handleSavePDF()}
                    onSaveExcel={() => handleSaveExcel()}
                />
                <div className="p-6" ref={tableRef}>
                    <TableContent
                        columns={columns}
                        data={dataEntryFilter}
                        isSelect={false}
                        showEdit={false}
                        showPreview={false}
                        idKey="id"
                    />
                </div>
            </div>
        </div>
    )
}
