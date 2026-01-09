/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useRef } from "react";
import Navbar from "../../components/Navbar";
import TableHeaderReport from "../../ui/TableHeaderReport";
import TableContent from "../../ui/TableContent";
import html2pdf from "html2pdf.js";
import * as XLSX from "xlsx";

export default function PokjaHasilKelompokKerja() {
    const [tahun, setTahun] = useState('');
    const [metodePengadaan, setMetodePengadaan] = useState('');
    const [sumberDana, setSumberDana] = useState('');
    const tableRef = useRef<HTMLDivElement>(null);

    const tahunOptions = [
        { id: '2023', tahun: '2023' },
        { id: '2024', tahun: '2024' },
        { id: '2025', tahun: '2025' }
    ];

    const metodePengadaanOptions = [
        { id: '1', text: 'Pengadaan Langsung' },
        { id: '2', text: 'E-Purchasing V5' },
        { id: '3', text: 'E-Purchasing V6' }
    ];

    const sumberDanaOptions = [
        { id: '1', text: 'APBN' },
        { id: '2', text: 'APBD' },
        { id: '3', text: 'Hibah' }
    ];

    const columns = [
        {
            key: 'no',
            label: 'No'
        },
        {
            key: 'opd',
            label: 'OPD'
        },
        {
            key: 'namaPaket',
            label: 'Nama Paket'
        },
        {
            key: 'pengadaan',
            label: 'Metode Pengadaan'
        },
        {
            key: 'pagu',
            label: 'Nilai Pagu'
        },
        {
            key: 'hps',
            label: 'Nilai HPS'
        },
        {
            key: 'pemenang',
            label: 'Pemenang'
        },
        {
            key: 'penawaran',
            label: 'Nilai Penawaran'
        },
        {
            key: 'negosiasi',
            label: 'Nilai Negosiasi'
        },
        {
            key: 'tanggal',
            label: 'No & Tanggal'
        },
        {
            key: 'efisiensi',
            label: 'Efisiensi Nilai Pagu-Kontrak'
        },
        {
            key: 'presentase',
            label: 'presentase'
        },
    ];

    const data = [
        {
            no: 1,
            opd: "Dinas Pekerjaan Umum",
            namaPaket: "Rekonstruksi/Peningkatan Jalan Wawongole - Teteona (Duriaasi)",
            pengadaan: "Pengadaan Langsung",
            pagu: "Rp 1.500.000.000",
            hps: "Rp 1.450.000.000",
            pemenang: "CV Maju Jaya Konstruksi",
            penawaran: "Rp 1.420.000.000",
            negosiasi: "Rp 1.400.000.000",
            tanggal: "SPK-01 / 30 Desember 2024",
            efisiensi: "Rp 100.000.000",
            presentase: "6,67%"
        },
        {
            no: 2,
            opd: "Dinas Perhubungan",
            namaPaket: "Perbaikan Jembatan Sungai Tawa",
            pengadaan: "E-Purchasing V5",
            pagu: "Rp 850.000.000",
            hps: "Rp 830.000.000",
            pemenang: "PT Sarana Infrastruktur",
            penawaran: "Rp 820.000.000",
            negosiasi: "Rp 800.000.000",
            tanggal: "SPK-02 / 23 Januari 2025",
            efisiensi: "Rp 50.000.000",
            presentase: "5,88%"
        },
        {
            no: 3,
            opd: "Dinas Pendidikan",
            namaPaket: "Pengadaan Meubel Sekolah Dasar",
            pengadaan: "E-Purchasing V6",
            pagu: "Rp 500.000.000",
            hps: "Rp 490.000.000",
            pemenang: "CV Sumber Rezeki",
            penawaran: "Rp 480.000.000",
            negosiasi: "Rp 470.000.000",
            tanggal: "SPK-03 / 10 Februari 2025",
            efisiensi: "Rp 30.000.000",
            presentase: "6,00%"
        }
    ];

    const generateTableHTML = () => {
        const thead = `
        <tr>
            ${columns.map(col => `<th>${col.label}</th>`).join("")}
        </tr>
    `;

        const tbody = data.map(row => `
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
            ...data.map(row => columns.map(col => (row as Record<string, any>)[col.key] ?? "")),
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

    return (
        <div>
            <Navbar type="pokja" />

            <div className="pt-24" data-aos="fade-up" data-aos-duration="1000">
                <TableHeaderReport
                    title="DAFTAR PAKET PROSES PEMILIHAN PENYEDIA BARANG/JASA"
                    tahunOptions={tahunOptions}
                    metodePengadaanOptions={metodePengadaanOptions}
                    sumberDanaOptions={sumberDanaOptions}
                    selectedTahun={tahun}
                    selectedMetodePengadaan={metodePengadaan}
                    selectedSumberDana={sumberDana}
                    onTahunChange={setTahun}
                    onMetodePengadaanChange={setMetodePengadaan}
                    onSumberDanaChange={setSumberDana}
                    onBuatReport={() => console.log('Buat Report')}
                    onPrint={() => handlePrint()}
                    onSavePDF={() => handleSavePDF()}
                    onSaveExcel={() => handleSaveExcel()}
                />

                <div className="p-6" ref={tableRef}>
                    <TableContent
                        columns={columns}
                        data={data}
                        isSelect={false}
                        showEdit={false}
                        showPreview={false}
                        idKey="no"
                    />
                </div>
            </div>
        </div>
    )
}
