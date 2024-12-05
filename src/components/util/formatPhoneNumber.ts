export function formatPhoneNumber(value: string): string {
    // Remove all non-digit characters
    const cleanedValue = value.replace(/\D/g, '');
    
    // Apply the mask
    if (cleanedValue.length <= 10) {
      // For numbers with 10 digits or less (XX) XXXX-XXXX
      return cleanedValue.replace(/(\d{2})(\d{0,4})(\d{0,4})/, '($1) $2-$3').trim();
    } else {
      // For numbers with 11 digits (XX) XXXXX-XXXX
      return cleanedValue.replace(/(\d{2})(\d{0,5})(\d{0,4})/, '($1) $2-$3').trim();
    }
  }

  export function removePhoneMask(formattedPhone: string): string {
    // Remove todos os caracteres que não sejam números
    return formattedPhone.replace(/\D/g, '');
  }
  