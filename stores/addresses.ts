export const useAddressesStore = defineStore("addresses", () => {
  const { $API } = useNuxtApp();
  const addresses = ref(null);

  const fetchAddresses = async (page = 1, itemsPerPage = 10) => {
    try {
      const response = await $API.address.apiCustomerAddressesGetCollection({
        page,
        itemsPerPage,
      });
      addresses.value = response["hydra:member"];
      return addresses.value;
    } catch (error) {
      console.error("Erreur lors de la récupération des adresses:", error);
    }
  };

  const createAddress = async (addressData) => {
    try {
      const response = await $API.address.apiCustomerAddressesPost(addressData);
      addresses.value.push(response);
      return response;
    } catch (error) {
      console.error("Erreur lors de la création de l'adresse:", error);
      throw error;
    }
  };

  const fetchAddressById = async (id) => {
    try {
      const response = await $API.address.apiCustomerAddressesIdGet(id);
      return response;
    } catch (error) {
      console.error("Erreur lors de la récupération de l'adresse:", error);
      throw error;
    }
  };

  const updateAddress = async (id, updatedData) => {
    try {
      const response = await $API.address.apiCustomerAddressesIdPatch(id, updatedData);
      const index = addresses.value.findIndex((address) => address.id === id);
      if (index !== -1) {
        addresses.value[index] = response;
      }
      return response;
    } catch (error) {
      console.error("Erreur lors de la mise à jour de l'adresse:", error);
      throw error;
    }
  };

  const deleteAddress = async (id) => {
    try {
      await $API.address.apiCustomerAddressesIdDelete(id);
      addresses.value = addresses.value.filter((address) => address.id !== id);
    } catch (error) {
      console.error("Erreur lors de la suppression de l'adresse:", error);
      throw error;
    }
  };

  return {
    addresses,
    fetchAddresses,
    createAddress,
    fetchAddressById,
    updateAddress,
    deleteAddress,
  };
});
