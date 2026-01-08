import Swal, { type SweetAlertIcon } from 'sweetalert2';

interface SwalMessageProps {
    title: string;
    text?: string;
    type?: SweetAlertIcon;
    confirmText?: string;
    timer?: number;
    showConfirmButton?: boolean;
}

export const SwalMessage = ({
    title,
    text = '',
    type = 'success',
    confirmText = 'OK',
    timer,
    showConfirmButton = true,
}: SwalMessageProps) => {
    return Swal.fire({
        icon: type,
        title,
        text,
        confirmButtonText: confirmText,
        showConfirmButton,
        timer,
        timerProgressBar: !!timer,
        allowOutsideClick: false,
        allowEscapeKey: true,
        confirmButtonColor:
            type === 'success'
                ? '#16a34a'
                : type === 'error'
                ? '#dc2626'
                : '#2563eb',
        showClass: {
            popup: 'swal2-show',
        },
        hideClass: {
            popup: 'swal2-hide',
        },
    });
};
