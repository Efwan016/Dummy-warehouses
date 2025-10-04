// src/pages/merchants/AddMerchant.jsx
import UserProfileCard from "../../components/UserProfileCard";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useMerchants } from "../../hooks/useMerchants";

const AddMerchant = () => {
  const { addMerchant } = useMerchants();
  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    const newMerchant = {
      id: Date.now(), // unique id
      name: data.name,
      phone: data.phone,
      address: data.address,
      keeper: { name: data.keeperName || "Unknown" }, // keeper dummy sementara
      products: [], // awalnya kosong
      photo: data.photo || "/assets/images/icons/store-default.png",
    };

    addMerchant(newMerchant); // ⬅️ simpan ke localStorage
    navigate("/merchants");
  };

  return (
    <div className="flex flex-1">
      <div className="flex flex-col flex-1 p-6">
        <UserProfileCard />
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white p-6 rounded-2xl flex flex-col gap-4"
        >
          <h2 className="font-semibold text-xl">Add New Merchant</h2>

          <input
            {...register("name", { required: "Merchant name is required" })}
            className="border p-3 rounded-lg"
            placeholder="Merchant Name"
          />
          {errors.name && <p className="text-red-500">{errors.name.message}</p>}

          <input
            {...register("phone")}
            className="border p-3 rounded-lg"
            placeholder="Phone"
          />

          <input
            {...register("address")}
            className="border p-3 rounded-lg"
            placeholder="Address"
          />

          <input
            {...register("keeperName")}
            className="border p-3 rounded-lg"
            placeholder="Keeper Name"
          />

          <input
            {...register("photo")}
            className="border p-3 rounded-lg"
            placeholder="Photo URL"
          />

          <div className="flex justify-end gap-3">
            <Link to="/merchants" className="btn btn-red">
              Cancel
            </Link>
            <button type="submit" className="btn btn-primary">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddMerchant;
