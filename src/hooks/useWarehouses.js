import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const useWarehouses = () => {
  const navigate = useNavigate();
  const [warehouses, setWarehouses] = useState([]);

  // ✅ ambil data dari localStorage saat pertama kali load
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("warehouses")) || [];
    setWarehouses(stored);
  }, []);

  // ✅ function buat nyimpen ke localStorage
  const saveToLocal = (data) => {
    localStorage.setItem("warehouses", JSON.stringify(data));
    setWarehouses(data);
  };

  const createWarehouse = (data) => {
    const newWarehouse = {
      id: Date.now(),
      ...data,
      photo: data.photo,
      products: [],
    };
    const updated = [...warehouses, newWarehouse];
    saveToLocal(updated);
    navigate("/warehouses");
  };


  const updateWarehouse = (id, data) => {
    const updated = warehouses.map((w) =>
      w.id === Number(id) ? { ...w, ...data } : w
    );
    saveToLocal(updated);
    navigate("/warehouses");
  };

  const deleteWarehouse = (id) => {
    if (window.confirm("Are you sure you want to delete this warehouse?")) {
      const updated = warehouses.filter((w) => w.id !== id);
      setWarehouses(updated);
      localStorage.setItem("warehouses", JSON.stringify(updated)); // ✅ sync ke localStorage
    }
    navigate("/warehouses");
  };

  const getWarehouse = (id) =>
    warehouses.find((w) => w.id === Number(id));

  return {
    warehouses,
    createWarehouse,
    updateWarehouse,
    deleteWarehouse,
    getWarehouse,
  };
};
