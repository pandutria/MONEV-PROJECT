/* eslint-disable @typescript-eslint/no-explicit-any */
import { Eye, Edit2, CheckCircle } from 'lucide-react';
import { useState } from 'react';

interface TableColumn {
    key: string;
    label: string;
}

interface TableContentProps {
    columns: TableColumn[];
    data: any[];
    isSelect?: boolean;
    showEdit?: boolean;
    showPreview?: boolean;
    showSelect?: boolean;
    onEdit?: (item: any) => void;
    onPreview?: (item: any) => void;
    onSelectedChange?: (selected: any[]) => void;
    idKey?: string;
    onSelectedIdsChange?: (ids: any[]) => void;
    onSelectedDataChange?: (data: any[]) => void;
}

export default function TableContent({
    columns,
    data,
    isSelect = false,
    showEdit = true,
    showPreview = true,
    showSelect = false,
    onEdit,
    onPreview,
    onSelectedChange,
    idKey = 'id',
    onSelectedIdsChange,
    onSelectedDataChange
}: TableContentProps) {
    const [selectedIds, setSelectedIds] = useState<any[]>([]);

    const handleSelectAll = (checked: boolean) => {
        if (checked) {
            const allIds = data.map(item => item[idKey]);
            setSelectedIds(allIds);
            onSelectedChange?.(data);

            onSelectedIdsChange?.(allIds);
            onSelectedDataChange?.(data);
        } else {
            setSelectedIds([]);
            onSelectedChange?.([]);
            onSelectedIdsChange?.([]);
            onSelectedDataChange?.([]);
        }
    };

    const handleSelectItem = (item: any, checked: boolean) => {
        const itemId = item[idKey];
        let newSelectedIds: any[];

        if (checked) {
            newSelectedIds = [...selectedIds, itemId];
        } else {
            newSelectedIds = selectedIds.filter(id => id !== itemId);
        }

        setSelectedIds(newSelectedIds);

        const newSelectedItems = data.filter(d => newSelectedIds.includes(d[idKey]));

        onSelectedChange?.(newSelectedItems);
        onSelectedIdsChange?.(newSelectedIds);

        const selectedData = data.filter(d =>
            newSelectedIds.includes(d[idKey])
        );
        onSelectedDataChange?.(selectedData);
    };

    const isSelected = (item: any) => selectedIds.includes(item[idKey]);
    const isAllSelected = data.length > 0 && selectedIds.length === data.length;

    return (
        <div className="w-full bg-white rounded-lg shadow-md overflow-hidden">
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead className="bg-primary/10 border-b border-gray-200 font-poppins-semibold">
                        <tr>
                            {isSelect && (
                                <th className="px-6 py-4 text-center">
                                    <input
                                        type="checkbox"
                                        checked={isAllSelected}
                                        onChange={(e) => handleSelectAll(e.target.checked)}
                                        className="w-4 h-4 text-primary bg-gray-100 border-gray-300 rounded focus:ring-primary focus:ring-2 cursor-pointer"
                                    />
                                </th>
                            )}
                            {columns.map((column) => (
                                <th
                                    key={column.key}
                                    className="px-8 py-4 text-center font-poppins-semibold text-sm text-gray-700 uppercase tracking-wider"
                                >
                                    {column.label}
                                </th>
                            ))}
                            {(showEdit || showPreview || showSelect) && (
                                <th className="px-6 py-4 text-center font-poppins-semibold text-sm text-gray-700 uppercase tracking-wider">
                                    Aksi
                                </th>
                            )}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 font-poppins-medium">
                        {data.length === 0 ? (
                            <tr className='text-center'>
                                <td
                                    colSpan={columns.length + (isSelect ? 1 : 0) + (showEdit || showPreview ? 1 : 0)}
                                    className="px-8 py-8 text-center font-poppins text-gray-500"
                                >
                                    Tidak ada data
                                </td>
                            </tr>
                        ) : (
                            data.map((item, index) => (
                                <tr
                                    key={index}
                                    className="hover:bg-gray-50 transition-colors duration-150 text-center"
                                >
                                    {isSelect && (
                                        <td className="px-6 py-4">
                                            <input
                                                type="checkbox"
                                                checked={isSelected(item)}
                                                onChange={(e) => handleSelectItem(item, e.target.checked)}
                                                className="w-4 h-4 text-primary bg-gray-100 border-gray-300 rounded focus:ring-primary focus:ring-2 cursor-pointer"
                                            />
                                        </td>
                                    )}
                                    {columns.map((column) => (
                                        <td
                                            key={column.key}
                                            className=" py-4 font-poppins text-[12px] text-gray-700"
                                        >
                                            {column.key === 'id' ? index + 1 : item[column.key]}
                                        </td>
                                    ))}
                                    {(showEdit || showPreview || showSelect) && (
                                        <td className="px-6 py-4">
                                            <div className="flex items-center justify-center gap-2">
                                                {showEdit && (
                                                    <button
                                                        onClick={() => onEdit?.(item)}
                                                        className="p-2 text-primary hover:bg-primary/10 rounded-lg transition-colors duration-200 cursor-pointer flex flex-row items-center gap-2"
                                                        title="Ubah"
                                                    >
                                                        <Edit2 className="h-5 w-5" />
                                                        <p className='text-[12px]'>Ubah</p>
                                                    </button>
                                                )}
                                                {showPreview && (
                                                    <button
                                                        onClick={() => onPreview?.(item)}
                                                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200 cursor-pointer flex flex-row items-center gap-2"
                                                        title="Lihat"
                                                    >
                                                        <Eye className="h-5 w-5" />
                                                        <p className='text-[12px]'>Lihat</p>
                                                    </button>
                                                )}
                                                {showSelect && (
                                                    <button
                                                        onClick={() => onSelectedDataChange?.(item)}
                                                        className="p-2 text-green-600 hover:bg-blue-50 rounded-lg transition-colors duration-200 cursor-pointer flex flex-row items-center gap-2"
                                                        title="Pilih"
                                                    >
                                                        <CheckCircle className="h-5 w-5" />
                                                        <p className='text-[12px]'>Pilih</p>
                                                    </button>
                                                )}
                                            </div>
                                        </td>
                                    )}
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}