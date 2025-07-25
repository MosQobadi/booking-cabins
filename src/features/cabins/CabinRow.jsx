import styled from "styled-components";
import { formatCurrency } from "../../utils/helpers";
import { useState } from "react";
import CreateCabinForm from "./CreateCabinForm";
import { useDeleteCabin } from "./useDeleteCabin";
import { HiPencil, HiSquare2Stack, HiTrash } from "react-icons/hi2";
import { useCreateCabin } from "./useCreateCabin";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
import { Menus } from "../../ui/Menus";

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
  /* transform: scale(1.66666) translateX(-2px); */
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

function CabinRow({ cabin }) {
  const { deleteCabin, isDeleting } = useDeleteCabin();
  const { createCabin, isCreating } = useCreateCabin();
  const [show, setShow] = useState();
  const [showConfirm, setShowConfirm] = useState(false);

  const {
    id: cabinId,
    name,
    maxCapacity,
    regularPrice,
    discount,
    image,
    description,
  } = cabin;

  function handleDuplicate() {
    createCabin({
      name: `Copy of ${name}`,
      maxCapacity,
      regularPrice,
      discount,
      image,
      description,
    });
  }

  return (
    <>
      <TableRow role="row">
        <Img src={image} />
        <Cabin>{name}</Cabin>
        <div>Fits up to {maxCapacity} guests</div>
        <Price>{formatCurrency(regularPrice)}</Price>
        {discount ? (
          <Discount>{formatCurrency(discount)}</Discount>
        ) : (
          <span>&mdash;</span>
        )}
        <div>
          {show && (
            <Modal onClose={() => setShow(() => !show)}>
              <CreateCabinForm
                cabinToEdit={cabin}
                onCloseModal={() => setShow(false)}
              />
            </Modal>
          )}
          {showConfirm && (
            <Modal onClose={() => setShowConfirm(() => !showConfirm)}>
              <ConfirmDelete
                onConfirm={() => deleteCabin(cabinId)}
                closeModal={() => setShowConfirm(() => !showConfirm)}
                disabled={isDeleting}
              />
            </Modal>
          )}
          <Menus.Menu>
            <Menus.Toggle id={cabinId} />
            <Menus.List id={cabinId}>
              <Menus.Button
                onClick={() => handleDuplicate()}
                icon={<HiSquare2Stack />}
              >
                Duplicate
              </Menus.Button>
              <Menus.Button
                onClick={() => setShow(() => !show)}
                icon={<HiPencil />}
              >
                Edit
              </Menus.Button>
              <Menus.Button
                onClick={() => setShowConfirm(() => !showConfirm)}
                icon={<HiTrash />}
              >
                Delete
              </Menus.Button>
            </Menus.List>
          </Menus.Menu>
        </div>
      </TableRow>
    </>
  );
}

export default CabinRow;
