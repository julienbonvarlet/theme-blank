import type { Address_AddressInput_jsonld, Address_jsonld } from "@faume-tech/sdk-recommerce";
import type { ApiCollection } from "~/types/types";

export const useAddressesStore = defineStore("address", () => {
  const { $getCollection, $get, $post, $patch, $delete } = useNuxtApp();
  const addresses = ref<Address_jsonld[]>([]);

  const fetchAddresses = async (page = 1, itemsPerPage = 10) => {
    const response = await $getCollection<ApiCollection<Address_jsonld>>(`/api/v3/customer/addresses?page=${page}&itemsPerPage=${itemsPerPage}`);
    addresses.value = response.items;
    return addresses.value;
  };

  const createAddress = async (addressData: Address_AddressInput_jsonld) => {
    const response = await $post<Address_jsonld>("/api/v3/customer/addresses", { body: addressData });
    addresses.value.push(response);

    return response;
  };

  const fetchAddressById = async (addressId: string) => {
    const response = await $get<Address_jsonld>(`/api/v3/customer/addresses/${addressId}`);

    return response;
  };

  const updateAddress = async (addressId: string, updatedData: Address_AddressInput_jsonld) => {
    const response = await $patch<Address_jsonld>(`/api/v3/customer/addresses/${addressId}`, { body: updatedData });
    const index = addresses.value.findIndex((address) => address.id === addressId);
    if (index !== -1) {
      addresses.value[index] = response;
    }

    return response;
  };

  const deleteAddress = async (addressId: string) => {
    await $delete(`/api/v3/customer/addresses/${addressId}`);
    addresses.value = addresses.value.filter((address) => address.id !== addressId);
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
