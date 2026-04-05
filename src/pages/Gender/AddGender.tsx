import SubmitButton from "../../../components/Button/SubmitButton";
import FloatingLabelInput from "../../../components/Input/FloatingLabelInput";

const AddGender = () => {
  return (
    <>
    <div className="mb-4">
      <FloatingLabelInput label="Gender" type="text" name="gender"/>
      </div>
      <div>
        SubmitButton label="Save Gender"/>
      </div>
    </>
  );
};

export default AddGender;
