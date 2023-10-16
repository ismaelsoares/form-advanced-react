
export const handlePhone = (event: any) => {
    const input = event.target
    input.value = phoneMask(input.value)
}

const phoneMask = (value: string) => {
    if (!value) return ""
    value = value.replace(/\D/g, '')
    value = value.replace(/(\d{2})(\d)/, "($1) $2")
    value = value.replace(/(\d)(\d{4})$/, "$1-$2")
    return value
}

// export function maskPhone(value: string) {
//     value = value.replace(/\D/g, "");
//     value = value.replace(/^(\d{2})(\d)/g, "($1)$2");
//     value = value.replace(/(\d)(\d{4})$/, "$1-$2");
//     return value;
// }

// export function maskCurrency(value: string) {
//     value = value.replace(/\D/g, "");
//     value = value.replace(/(\d)(\d{2})$/, "$1.$2");
//     value = value.replace(/(?=(\d{3})+(\D))\B/g, " ");
//     return value;
// }