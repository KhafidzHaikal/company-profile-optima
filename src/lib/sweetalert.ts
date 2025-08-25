import Swal from "sweetalert2";

export const customSwal = Swal.mixin({
  customClass: {
    popup: 'bg-background border border-border rounded-xl shadow-2xl max-w-md',
    title: 'text-foreground font-bold text-xl mb-2',
    htmlContainer: 'text-muted-foreground text-sm leading-relaxed',
    confirmButton: 'bg-yellow-400 hover:bg-yellow-500 text-black font-semibold px-6 py-3 rounded-lg border-0 transition-colors',
    cancelButton: 'bg-muted hover:bg-muted/80 text-muted-foreground font-medium px-6 py-3 rounded-lg border-0 transition-colors',
    actions: 'gap-3 mt-6 flex justify-center',
    icon: 'border-4 border-yellow-400'
  },
  buttonsStyling: false,
  showClass: {
    popup: 'animate-in fade-in-0 zoom-in-95 duration-300 ease-out'
  },
  hideClass: {
    popup: 'animate-out fade-out-0 zoom-out-95 duration-200 ease-in'
  },
  padding: '2rem',
  width: '400px'
});

// Success alert configuration
export const successSwal = Swal.mixin({
  customClass: {
    popup: 'bg-background border border-green-200 rounded-xl shadow-2xl max-w-md',
    title: 'text-green-600 font-bold text-xl mb-2',
    htmlContainer: 'text-muted-foreground text-sm leading-relaxed',
    confirmButton: 'bg-green-500 hover:bg-green-600 text-white font-semibold px-6 py-3 rounded-lg border-0 transition-colors',
    icon: 'border-4 border-green-500 text-green-500'
  },
  buttonsStyling: false,
  showClass: {
    popup: 'animate-in fade-in-0 zoom-in-95 duration-300 ease-out'
  },
  hideClass: {
    popup: 'animate-out fade-out-0 zoom-out-95 duration-200 ease-in'
  },
  padding: '2rem',
  width: '400px'
});

// Error alert configuration
export const errorSwal = Swal.mixin({
  customClass: {
    popup: 'bg-background border border-red-200 rounded-xl shadow-2xl max-w-md',
    title: 'text-red-600 font-bold text-xl mb-2',
    htmlContainer: 'text-muted-foreground text-sm leading-relaxed',
    confirmButton: 'bg-red-500 hover:bg-red-600 text-white font-semibold px-6 py-3 rounded-lg border-0 transition-colors',
    icon: 'border-4 border-red-500 text-red-500'
  },
  buttonsStyling: false,
  showClass: {
    popup: 'animate-in fade-in-0 zoom-in-95 duration-300 ease-out'
  },
  hideClass: {
    popup: 'animate-out fade-out-0 zoom-out-95 duration-200 ease-in'
  },
  padding: '2rem',
  width: '400px'
});

// Warning/Confirm alert configuration
export const confirmSwal = Swal.mixin({
  customClass: {
    popup: 'bg-background border border-orange-200 rounded-xl shadow-2xl max-w-md',
    title: 'text-orange-600 font-bold text-xl mb-2',
    htmlContainer: 'text-muted-foreground text-sm leading-relaxed',
    confirmButton: 'bg-red-500 hover:bg-red-600 text-white font-semibold px-6 py-3 rounded-lg border-0 transition-colors',
    cancelButton: 'bg-muted hover:bg-muted/80 text-muted-foreground font-medium px-6 py-3 rounded-lg border-0 transition-colors',
    actions: 'gap-3 mt-6 flex justify-center',
    icon: 'border-4 border-orange-500 text-orange-500'
  },
  buttonsStyling: false,
  showClass: {
    popup: 'animate-in fade-in-0 zoom-in-95 duration-300 ease-out'
  },
  hideClass: {
    popup: 'animate-out fade-out-0 zoom-out-95 duration-200 ease-in'
  },
  padding: '2rem',
  width: '400px'
});

export default customSwal;