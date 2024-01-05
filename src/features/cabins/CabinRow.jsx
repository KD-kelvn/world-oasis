import styled from "styled-components";
import { HiPencil, HiSquare2Stack, HiTrash } from "react-icons/hi2";
import { formatCurrency } from "../../utils/helpers";
import { useDeleteCabin } from "./useDeleteCabin";
import { useState } from "react";
import CreateCabinForm from "./CreateCabinForm";
import { useCreateCabin } from "./useCreateCabin";
const TableRow = styled.div`
  display: grid;
  grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
  column-gap: 2.4rem;
  align-items: center;
  padding: 1.4rem 2.4rem;

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }
`;

const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
`;

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Price = styled.div`
  font-family: "Sono";
  font-weight: 600;
`;

const Discount = styled.div`
  font-family: "Sono";
  font-weight: 500;
  color: var(--color-green-700);
`;



const CabinRow = ({
  cabin
}) => {
  const { id, name, image, maxCapacity, regularPrice, discount, description } = cabin

  const { deleteCabin, isDeleting } = useDeleteCabin()
  const { isCreating, createCabin } = useCreateCabin()

  const [showEditForm, setShowEditForm] = useState(false)

  function handleEdit() {
    setShowEditForm(prev => !prev)
  }

  function handleDelete() {
    deleteCabin(id)
  }

  function handleDuplicate() {
    createCabin({
      name: `copy of ${name}`,
      image,
      maxCapacity,
      regularPrice,
      discount,
      description,
    })
  }
  return (
    <>
      <TableRow role="row">

        <div>
          <Img src={image} alt={name} />
        </div>
        <Cabin>{name}</Cabin>
        <div>Fits up to {maxCapacity} people</div>
        <Price>{formatCurrency(regularPrice)}</Price>
        {
          discount ? <Discount>{formatCurrency(discount)}</Discount> : <span>&mdash;</span>
        }
        <div>
          <button disabled={isCreating} onClick={handleDuplicate}>
            <HiSquare2Stack />
          </button>
          <button
            onClick={handleEdit}

          >  <HiPencil /></button>
          <button
            onClick={handleDelete}
            disabled={isDeleting}
          > <HiTrash /></button>
        </div>

      </TableRow>
      {showEditForm && <CreateCabinForm cabinToEdit={cabin} />}
    </>

  )
}

export default CabinRow
