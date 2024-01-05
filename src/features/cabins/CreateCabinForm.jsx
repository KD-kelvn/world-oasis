
import { useForm } from "react-hook-form";
import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import FormRow from "../../ui/FormRow";
import Textarea from "../../ui/Textarea";
import { useCreateCabin } from "./useCreateCabin";
import { useEditCabin } from "./useEditCabin";


const CreateCabinForm = ({ cabinToEdit = {}, onCloseModal }) => {
  const { id: editId, ...editValues } = cabinToEdit
  const isEditSession = Boolean(editId)


  const { register, handleSubmit, reset, getValues, formState } = useForm({
    defaultValues: isEditSession ? editValues : {},
  });
  const { errors } = formState;

  const { isCreating, createCabin } = useCreateCabin();

  const { isEditing, editCabin } = useEditCabin();
  const isWorking = isCreating || isEditing;

  function onSubmit(data) {
    if (isEditSession) {
      const image = typeof data.image === "string" ? data.image : data.image[0]
      editCabin({ newCabinData: { ...data, image: image }, id: editId })
      return
    }
    else createCabin({ ...data, image: data.image[0] }, {
      onSuccess: function () {
        reset();
        onCloseModal?.()
      }
    })
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}
      type={onCloseModal ? "modal" : "regular"}
    >
      <FormRow label="Cabin name" error={errors?.name?.message}>
        <Input
          type="text"
          id="name" {...register("name", {
            required: "Cabin name is required",
            minLength: {
              value: 3,
              message: "Cabin name must be at least 3 characters long",
            },
          })} />
      </FormRow>

      <FormRow
        label="Maximum capacity"
        error={errors?.maxCapacity?.message}
      >
        <Input
          type="number"
          id="maxCapacity"
          {...register("maxCapacity", {
            required: "Maximum capacity is required",
            min: {
              value: 1,
              message: "Maximum capacity must be at least 1",
            },
          })}
        />
      </FormRow>

      <FormRow
        label="Regular price"
        error={errors?.regularPrice?.message}
      >
        <Input
          type="number"
          id="regularPrice"
          {...register("regularPrice", {
            required: "Regular price is required",
            min: {
              value: 50,
              message: "Regular price must be at least 50",
            },
          })}
        />
      </FormRow>

      <FormRow
        label="Discount"
        error={errors?.discount?.message}
      >
        <Input
          type="number"
          id="discount"
          defaultValue={0}
          {...register("discount", {
            required: "Discount is required",
            min: {
              value: 0,
              message: "Discount must be at least 0",
            },
            validate: function (value) {
              return value <= getValues('regularPrice') || "Discount must be less than regular price"
            }
          })}
        />
      </FormRow>

      <FormRow
        label="Description"
        error={errors?.description?.message}
        orientation="vertical"
      >
        <Textarea
          type="number"
          id="description" defaultValue=""
          {...register("description", {
            required: "Description is required",
            minLength: {
              value: 10,
              message: "Description must be at least 10 characters long",
            },
          })}
        />
      </FormRow>

      <FormRow
        label="Cabin photo"
        error={errors?.image?.message}
      >
        <FileInput
          id="image"
          accept="image/*"
          {...register("image", {
            required: isEditSession ? false : "Cabin photo is required",
          })}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button
          variation="secondary"
          type="reset"
          onClick={
            () => onCloseModal?.()
          }

        >
          Cancel
        </Button>
        <Button

          disabled={isWorking}

        >{
            isEditSession ? "Update " : "Create new "
          } cabin</Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
