import { useState } from "react";
import { initialWarehouses } from "../data/warehouses";
import { useNavigate } from "react-router-dom";

// global mock
let warehousesDB = [...initialWarehouses];

export const useWarehouses = () => {
  const navigate = useNavigate();
  const [warehouses, setWarehouses] = useState(warehousesDB);

  const createWarehouse = (data) => {
    const newWarehouse = {
      id: Date.now(),
      ...data,
      photo: data.photo || "/assets/images/icons/warehouse-1.svg",
      products: [],
    };
    const updated = [...warehouses, newWarehouse];
    setWarehouses(updated);
    warehousesDB = updated; // update global mock
    navigate("/warehouses");
  };

  const updateWarehouse = (id, data) => {
    const updated = warehouses.map((w) =>
      w.id === Number(id) ? { ...w, ...data } : w
    );
    setWarehouses(updated);
    warehousesDB = updated;
    navigate("/warehouses");
  };

  const deleteWarehouse = (id) => {
    const filtered = warehouses.filter((w) => w.id !== Number(id));
    setWarehouses(filtered);
    warehousesDB = filtered;
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
