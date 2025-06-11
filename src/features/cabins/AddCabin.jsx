import Modal from "../../ui/Modal";
import { useState } from "react";
import Button from "../../ui/Button";
import CreateCabinForm from "./CreateCabinForm";

function AddCabin() {
  const [isOpenModal, setIsOpenModal] = useState(false);

  return (
    <>
      <Button onClick={() => setIsOpenModal(true)}>Add new cabin</Button>
      {isOpenModal && (
        <Modal onClose={() => setIsOpenModal(false)}>
          <CreateCabinForm
            onCloseModal={() => {
              console.log(123);
              setIsOpenModal(false);
            }}
          />
        </Modal>
      )}
    </>
  );
}

export default AddCabin;
