import { TCelebrity } from "../lib/_definitions";
import chevronIcon from "../assets/chevron.svg";
import { getAge } from "../lib/utils";
import { Dispatch, MouseEvent, useEffect, useState } from "react";

type AccordianProps = TCelebrity & {
  isOpen: boolean;
  onChange: (id: number | null) => void;
  setCelebrities: Dispatch<React.SetStateAction<TCelebrity[]>>;
};

type FormData = {
  name: string;
  description: string;
  country: string;
  dob: string;
  gender: string;
};

export default function Celebrity({
  isOpen,
  description,
  country,
  dob,
  picture,
  gender,
  first,
  last,
  id,
  onChange,
  setCelebrities,
}: AccordianProps) {
  const initialFormData: FormData = {
    name: `${first} ${last}`,
    description,
    country,
    dob,
    gender,
  };
  const [formData, setFormData] = useState(initialFormData);
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      setEditing(false);
    }
  }, [isOpen]);

  const handleChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const updateCelebrity = () => {
    setCelebrities((prev) => {
      const updatedCelebrities = [...prev];
      const index = updatedCelebrities.findIndex((cel) => cel.id === id);
      const [firstName, lastName] = formData.name.trim().split(" ");
      updatedCelebrities[index] = {
        ...updatedCelebrities[index],
        ...formData,
        first: firstName,
        last: lastName,
      };
      return updatedCelebrities;
    });
  };

  const handleDelete = () => {
    setCelebrities((prev) => prev.filter((cel) => cel.id !== id));
  };

  const toggleEdit = () => {
    setEditing((prev) => !prev);
    updateCelebrity();
  };

  return (
    <div className={`border border-zinc-400 rounded-md space-y-3 ease-in-out p-4 relative`}>
      <Header
        first={first}
        last={last}
        picture={picture}
        isOpen={isOpen}
        id={id}
        onChange={onChange}
        editing={editing}
        onNameChange={handleChange}
        name={formData.name}
      />
      {isOpen && (
        <div className="transition-all duration-300 overflow-hidden text-sm tracking-wide space-y-4">
          <div className="flex">
            <DetailSection
              label="Age"
              editing={editing}
              value={formData.dob}
              displayValue={getAge(dob)}
              onChange={(value) => handleChange("dob", value)}
              inputType="date"
            />
            <DetailSection
              label="Gender"
              editing={editing}
              value={formData.gender}
              displayValue={gender}
              onChange={(value) => handleChange("gender", value)}
              inputType="select"
              options={[
                "male",
                "female",
                "transgender",
                "rather not say",
                "other",
              ]}
            />
            <DetailSection
              label="Country"
              editing={editing}
              value={formData.country}
              displayValue={country}
              onChange={(value) => handleChange("country", value)}
              inputType="text"
            />
          </div>
          <DetailSection
            label="Description"
            editing={editing}
            value={formData.description}
            displayValue={description}
            onChange={(value) => handleChange("description", value)}
            inputType="textarea"
          />
          <AccordianFooter
            editing={editing}
            setEditing={setEditing}
            onEdit={toggleEdit}
            onDelete={handleDelete}
          />
        </div>
      )}
    </div>
  );
}

type DetailSectionProps = {
  label: string;
  editing: boolean;
  value: string;
  displayValue: string | number;
  onChange: (value: string) => void;
  inputType: "text" | "date" | "select" | "textarea";
  options?: string[];
};

const DetailSection = ({
  label,
  editing,
  value,
  displayValue,
  onChange,
  inputType,
  options = [],
}: DetailSectionProps) => {
  const renderInput = () => {
    switch (inputType) {
      case "text":
      case "date":
        return (
          <input
            className="border-2 border-black px-2 inline-block w-fit rounded mt-1"
            type={inputType}
            value={value}
            onChange={(e) => onChange(e.target.value)}
          />
        );
      case "textarea":
        return (
          <textarea
            className="p-2 rounded-md mt-1 block border-2 border-black"
            rows={4}
            value={value}
            onChange={(e) => onChange(e.target.value)}
          />
        );
      case "select":
        return (
          <select
            className="border-2 border-black mt-1 px-2 inline-block w-fit rounded text-base"
            value={value}
            onChange={(e) => onChange(e.target.value)}
          >
            {options.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        );
    }
  };

  return (
    <div className="flex flex-col flex-1">
      <label className="text-zinc-600 font-medium">{label}</label>
      {editing ? renderInput() : <span>{displayValue}</span>}
    </div>
  );
};

const Header = ({
  first,
  last,
  picture,
  isOpen,
  id,
  onChange,
  editing,
  onNameChange,
  name,
}: Partial<AccordianProps> & {
  editing: boolean;
  onNameChange: (name: keyof FormData, value: string) => void;
  name: string;
}) => {
  const handleChange = () => {
    onChange!(isOpen ? null : id!);
  };

  return (
    <div className="flex items-center">
      <div className="flex items-center gap-2">
        <div className="rounded-full w-12 h-12 overflow-clip ">
          <img
            src={picture}
            alt={`${first} ${last}`}
            className="object-cover"
          />
        </div>
        {editing ? (
          <input
            onChange={(e) => {
              e.target.style.width = e.target.value.length + 3 + "ch";
              onNameChange("name", e.target.value);
            }}
            style={{ width: name.length + 3 + "ch" }}
            value={name}
            className="border border-black px-2 inline-block w-fit rounded-md text-xl font-semibold"
            type="text"
          />
        ) : (
          <p className="text-xl font-semibold">
            {first} {last}
          </p>
        )}
      </div>
      <button
        className="ml-auto active:bg-zinc-300 active:rounded"
        onClick={handleChange}
      >
        <img
          src={chevronIcon}
          alt="chevronIcon"
          className={`size-7 transition-transform duration-500 ${
            isOpen && "rotate-180"
          }`}
        />
      </button>
    </div>
  );
};

const AccordianFooter = ({
  editing,
  setEditing,
  onEdit,
  onDelete,
}: {
  editing: boolean;
  setEditing: (value: boolean) => void;
  onEdit: () => void;
  onDelete: (e: MouseEvent<HTMLButtonElement>) => void;
}) => {
  const [deleting, setDeleting] = useState<boolean>(false);
  if (!editing) {
    return (
      <>
        <div className="flex items-center justify-end px-3 pb-2 gap-4">
          <button
            className="flex items-center justify-center"
            onClick={() => setDeleting(true)}
          >
            {/* SVG for Delete */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              className="text-red-600 hover:text-red-800"
            >
              <path d="M3 6h18" />
              <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
              <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
              <line x1="10" x2="10" y1="11" y2="17" />
              <line x1="14" x2="14" y1="11" y2="17" />
            </svg>
          </button>
          <button
            onClick={() => setEditing(true)}
            className="flex items-center justify-center"
          >
            {/* SVG for Edit */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              className="text-blue-600 hover:text-blue-800"
            >
              <path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z" />
            </svg>
          </button>
        </div>
        {deleting && (
          <DeleteDialog setDeleting={setDeleting} deleteCelebrity={onDelete} />
        )}
      </>
    );
  }

  return (
    <div className="flex items-center justify-end px-3 pb-2 gap-4">
      <button
        onClick={() => setEditing(false)}
        className="flex items-center justify-center"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          className="text-red-600 hover:text-red-800"
        >
          <circle cx="12" cy="12" r="10" />
          <path d="m15 9-6 6" />
          <path d="m9 9 6 6" />
        </svg>
      </button>
      <button onClick={onEdit} className="flex items-center justify-center">
        {/* SVG for Save */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentcolor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          className="text-green-500 hover:text-green-800"
        >
          <circle cx="12" cy="12" r="10" />
          <path d="m9 12 2 2 4-4" />
        </svg>
      </button>
    </div>
  );
};

const DeleteDialog = ({
  setDeleting,
  deleteCelebrity,
}: {
  setDeleting: Dispatch<React.SetStateAction<boolean>>;
  deleteCelebrity: (e: MouseEvent<HTMLButtonElement>) => void;
}) => {
  return (
    <div className="absolute top-0 left-0 w-full h-full grid place-items-center backdrop-blur rounded-md !m-0">
      <div className="flex flex-col rounded border w-[80%] border-zinc-400 p-5 gap-12 absolute">
        <div className="flex justify-between">
          <p className="font-semibold normal-case">Are you sure you want to delete?</p>
          <button onClick={() => setDeleting(false)} className="flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              className="text-zinc-400 hover:text-zinc-800"
            >
              <path d="M18 6 6 18" />
              <path d="m6 6 12 12" />
            </svg>
          </button>
        </div>
        <div className="flex justify-end gap-2">
          <button
            onClick={() => setDeleting(false)}
            className="px-6 py-1.5 rounded-lg border border-zinc-400 font-semibold hover:bg-slate-900 hover:text-white"
          >
            Cancel
          </button>
          <button
            onClick={deleteCelebrity}
            className="px-6 py-1.5 rounded-lg font-semibold bg-[hsl(14,100%,57%)] hover:bg-[hsl(14,100%,57%)]/80 text-white"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};
