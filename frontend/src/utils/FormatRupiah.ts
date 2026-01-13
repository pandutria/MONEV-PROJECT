export default function FormatRupiah(number: number) {
    return new Intl.NumberFormat("id-ID", {
        currency: "IDR",
        style: "currency"
    }).format(number);
}
