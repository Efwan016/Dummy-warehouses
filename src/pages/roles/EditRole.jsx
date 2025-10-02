import { useParams, Link, useNavigate } from "react-router-dom";
import UserProfileCard from "../../components/UserProfileCard";
import { useForm } from "react-hook-form";
import { useRoles } from "../../hooks/useRoles";

const EditRole = () => {
  const { id } = useParams();
  const { getRoleById, updateRole } = useRoles();
  const navigate = useNavigate();

  const role = getRoleById(Number(id));

  const { register, handleSubmit, setValue } = useForm();

  if (!role) return <p>Role not found</p>;

  setValue("name", role.name);

  const onSubmit = (data) => {
    updateRole(Number(id), { name: data.name });
    navigate("/roles");
  };

  return (
    <div className="flex flex-1">
      <div className="flex flex-col flex-1 p-6">
        <UserProfileCard />
        <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-6 rounded-2xl flex flex-col gap-4">
          <h2 className="font-semibold text-xl">Edit Role</h2>
          <input {...register("name", { required: "Role name is required" })} className="border p-3 rounded-lg" defaultValue={role.name} />
          <div className="flex justify-end gap-3">
            <Link to="/roles" className="btn btn-red">Cancel</Link>
            <button type="submit" className="btn btn-primary">Save</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditRole;
