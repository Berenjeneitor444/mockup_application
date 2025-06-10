import { toast } from 'react-toastify';

export default function toastMaker(isError: boolean, message: string) {
    if (isError) {
        toast.error(message);
    } else {
        toast.success(message);
    }
}
