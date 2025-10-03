export let merchants = [
  {
    id: 1,
    name: "Merchant A",
    photo: "/assets/images/merchants/Merchants.png",
    keeper: { name: "Alice" },
    phone: "+62 812-3456-7890",
    address: "Jl. Merdeka No. 123, Jakarta",
    products: [{}, {}, {}],
  },
  {
    id: 2,
    name: "Merchant B",
    photo: "/assets/images/merchants/Merchants-1.png",
    keeper: { name: "Bob" },
    phone: "+62 811-9876-5432",
    address: "Jl. Sudirman No. 45, Bandung",
    products: [{}, {}],
  },
  {
    id: 3,
    name: "Merchant C",
    photo: "/assets/images/merchants/Merchants-2.png",
    keeper: { name: "Charlie" },
    phone: "+62 813-1122-3344",
    address: "Jl. Diponegoro No. 77, Surabaya",
    products: [{}],
  },
];

export const getMerchants = () => merchants;

// Ambil by ID
export const getMerchantById = (id) => merchants.find((m) => m.id === Number(id));

// Tambah merchant
export const addMerchant = (newMerchant) => {
  const id = merchants.length ? merchants[merchants.length - 1].id + 1 : 1;
  const merchant = { id, products: [], ...newMerchant };
  merchants.push(merchant);
  return merchant;
};

// Update merchant
export const updateMerchant = (id, updatedData) => {
  const index = merchants.findIndex((m) => m.id === Number(id));
  if (index !== -1) {
    merchants[index] = { ...merchants[index], ...updatedData };
    return merchants[index];
  }
  return null;
};

// Hapus merchant
export const deleteMerchant = (id) => {
  merchants = merchants.filter((m) => m.id !== Number(id));
};