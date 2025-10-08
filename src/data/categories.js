const CATEGORIES_KEY = "categories";

export const getCategoryById = (id) => {
  const data = JSON.parse(localStorage.getItem(CATEGORIES_KEY)) || [];
  return data.find((c) => c.id === id);
};

export const updateCategory = (id, updatedCategory) => {
  const data = JSON.parse(localStorage.getItem(CATEGORIES_KEY)) || [];

  // cegah simpan blob besar
  if (updatedCategory.photo?.startsWith("blob:")) {
    updatedCategory.photo = "/assets/images/icons/gallery-grey.svg";
  }

  const newData = data.map((c) => (c.id === id ? updatedCategory : c));

  try {
    localStorage.setItem(CATEGORIES_KEY, JSON.stringify(newData));
  } catch (err) {
    console.warn("⚠️ LocalStorage full, clearing...");
    localStorage.clear(); // opsional
    localStorage.setItem(CATEGORIES_KEY, JSON.stringify(newData));
  }
};
