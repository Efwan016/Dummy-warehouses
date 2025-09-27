import { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useWarehouses } from "../../hooks/useWarehouses";
import { useAuth } from "../../hooks/useAuth";
import { useForm } from "react-hook-form";
import UserProfileCard from "../../components/UserProfileCard";

const EditWarehouse = () => {
  const { id } = useParams();
  const { updateWarehouse, getWarehouse } = useWarehouses();
  const { user } = useAuth();
  const fileInputRef = useRef(null);
  const [imagePreview, setImagePreview] = useState(
    "/assets/images/icons/gallery-grey.svg"
  );

  const warehouse = getWarehouse(Number(id));

  const { register, handleSubmit, setValue, formState: { errors } } = useForm();

  useEffect(() => {
    if (warehouse) {
      setValue("name", warehouse.name);
      setValue("phone", warehouse.phone);
      setValue("address", warehouse.address || "");
      if (warehouse.photo) setImagePreview(warehouse.photo);
    }
  }, [warehouse, setValue]);

  const onSubmit = (data) => {
    if (!user.roles.includes("manager")) {
      alert("Only managers can edit warehouses");
      return;
    }

    if (data.photo instanceof File) {
      data.photo = URL.createObjectURL(data.photo);
    }

    updateWarehouse(Number(id), data);
  };

  if (!warehouse) return <p>Warehouse not found.</p>;

  return (
    <div id="main-container" className="flex flex-1">
      <div id="Content" className="flex flex-col flex-1 p-6 pt-0">
        <div className="flex items-center w-full gap-6 mt-[30px] mb-6 h-[92px] bg-white rounded-3xl p-[18px]">
          <div className="flex flex-col gap-[6px] w-full">
            <h1 className="font-bold text-2xl">Edit Warehouse</h1>
            <Link to={"/warehouses"} className="text-monday-gray font-semibold">
              ← Manage Warehouses
            </Link>
          </div>
          <UserProfileCard />
        </div>

        <main className="flex flex-col gap-6 flex-1">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col w-full rounded-3xl p-[18px] gap-5 bg-white"
          >
            <h2 className="font-semibold text-xl capitalize">Complete the form</h2>

            <div className="flex items-center gap-4">
              <div className="group relative flex size-[100px] rounded-2xl overflow-hidden items-center justify-center bg-monday-background">
                <img
                  src={imagePreview}
                  className="size-full object-cover"
                  alt="icon"
                />
                <input
                  type="file"
                  ref={fileInputRef}
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      setValue("photo", file);
                      setImagePreview(URL.createObjectURL(file));
                    }
                  }}
                  className="absolute inset-0 opacity-0 cursor-pointer"
                />
              </div>
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="btn btn-black w-[152px] font-semibold text-nowrap"
              >
                {imagePreview !== "/assets/images/icons/gallery-grey.svg"
                  ? "Change Photo"
                  : "Add Photo"}
              </button>
            </div>

            <input
              type="text"
              {...register("name", { required: true })}
              placeholder="Warehouse Name"
              className="input"
            />
            {errors.name && <p className="text-red-500">Name is required</p>}

            <input
              type="text"
              {...register("phone", { required: true })}
              placeholder="Phone Number"
              className="input"
            />
            {errors.phone && <p className="text-red-500">Phone is required</p>}

            <textarea
              {...register("address")}
              placeholder="Warehouse Address"
              className="textarea"
            />

            <div className="flex items-center justify-end gap-4">
              <Link to={"/warehouses"} className="btn btn-red font-semibold">
                Cancel
              </Link>
              <button type="submit" className="btn btn-primary font-semibold">
                Update Warehouse
              </button>
            </div>
          </form>
        </main>
      </div>
    </div>
  );
};

export default EditWarehouse;
