export function useSort() {
  const sortSizes = (sizes) => {
    const sizeOrder = [
      "3XS",
      "XXXS",
      "2XS",
      "XXS",
      "XS",
      "S",
      "M",
      "L",
      "XL",
      "XXL",
      "2XL",
      "XXXL",
      "3Xl",
      "XXXXL",
      "4XL",
      "5XL",
      "TU",
      "U",
    ];
    const sizesStr = sizes.map((size) => size.toString());
    return sizesStr.sort((a, b) => {
      const indexA = sizeOrder.indexOf(a) >= 0 ? sizeOrder.indexOf(a) : 100 + parseInt(a, 10);
      const indexB = sizeOrder.indexOf(b) >= 0 ? sizeOrder.indexOf(b) : 100 + parseInt(b, 10);
      if (indexA !== indexB) {
        return indexA - indexB;
      }
      if (isNaN(a) || isNaN(b)) {
        return a.localeCompare(b);
      }
      return parseInt(a, 10) - parseInt(b, 10);
    });
  };

  return {
    sortSizes,
  };
}
