export const useMyMerchantProfile = () => {
  const merchant = {
    id: 1,
    name: "Dummy Merchant",
    phone: "08123456789",
    photo: "/assets/images/icons/shop.png",
  };
  return { data: merchant };
};
