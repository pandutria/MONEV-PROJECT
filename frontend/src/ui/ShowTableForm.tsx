interface showTableFormProps {
    onClick?: () => void;
    tenderCode?: string;
}

export default function ShowTableForm({ tenderCode, onClick }: showTableFormProps) {
    return (
        <div>
            <label className="block font-poppins-medium text-sm text-gray-700 mb-2">
                Kode Tender
            </label>
            <div className="flex flex-row w-full gap-4 items-center">
                <div className="w-full text-[14px] px-4 py-2.5 border border-gray-300 rounded-lg font-poppins-medium text-left text-gray-700 hover:border-primary hover:bg-primary/5 transition-all duration-200 flex items-center justify-between">
                    <span>{tenderCode || 'Pilih Tender'}</span>
                </div>
                <button onClick={onClick} className='font-poppins-regular text-white bg-primary px-4 py-2.5 w-32.5 text-[14px] rounded-lg cursor-pointer border-2 border-primary hover:bg-transparent hover:text-primary transition-all'>List Tender</button>
            </div>
        </div>
    )
}
