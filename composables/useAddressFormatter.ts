export function useAddressFormatter() {
  const formatAddressCardText = (address) => {
    const { addressLine1, addressLine2, zipCode, company, countryCode, city } = address;
    let text = addressLine1;
    if (addressLine2 && addressLine2 !== "") {
      text += `\n${addressLine2}`;
    }
    if (company) {
      text += `\n${company}`;
    }
    text += `\n${zipCode} ${city}, ${countryCode}`;
    return {
      title: `${address.firstName} ${address.lastName}`,
      text: text,
      description: address.phone,
    };
  };

  return {
    formatAddressCardText,
  };
}
