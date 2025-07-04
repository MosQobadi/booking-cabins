import styled from "styled-components";
// import BookingRow from "features/bookings/BookingRow";
import Spinner from "../../ui/Spinner";
// import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
// import Pagination from "../../ui/Pagination";
import Empty from "../../ui/Empty";
// import BookingRow from "./BookingRow";
import { useBookings } from "./useBookings";
// import Table from "../../ui/Table";
import BookingRow from "./BookingRow";
import CabinRow from "../cabins/CabinRow";

const StyledTable = styled.div`
  border: 1px solid var(--color-grey-200);

  font-size: 1.4rem;
  background-color: var(--color-grey-0);
  border-radius: 7px;
  overflow: hidden;
`;

const CommonRow = styled.header`
  display: grid;
  grid-template-columns: ${(props) => props.columns};
  column-gap: 2.4rem;
  align-items: center;
  transition: none;
`;

const StyledHeader = styled(CommonRow)`
  padding: 1.6rem 2.4rem;

  background-color: var(--color-grey-50);
  border-bottom: 1px solid var(--color-grey-100);
  text-transform: uppercase;
  letter-spacing: 0.4px;
  font-weight: 600;
  color: var(--color-grey-600);
`;

const StyledBody = styled.section`
  margin: 0.4rem 0;
`;

const StyledRow = styled(CommonRow)`
  padding: 1.2rem 2.4rem;

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }
`;

const Footer = styled.footer`
  background-color: var(--color-grey-50);
  display: flex;
  justify-content: center;
  padding: 1.2rem;

  &:not(:has(*)) {
    display: none;
  }
`;

const Table = styled.div`
  border: 1px solid var(--color-grey-200);
  font-size: 1.4rem;
  border-radius: 7px;
  overflow: hidden;
`;

const TableHeader = styled.header`
  display: grid;
  grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
  column-gap: 2.4rem;
  align-items: center;
  background-color: var(--color-grey-50);
  border-bottom: 1px solid var(--color-grey-100);
  text-transform: uppercase;
  letter-spacing: 0.4px;
  font-weight: 600;
  color: var(--color-grey-600);
  padding: 1.6rem 2.4rem;
`;

function BookingTable() {
  const { bookings, count, isLoading } = useBookings();

  if (isLoading) return <Spinner />;
  if (!bookings) return <Empty resource={"bookings"}></Empty>;

  return (
    <div>
      <Menus>
        <Table>
          <TableHeader>
            <div></div>
            <div>Cabin</div>
            <div>Capacity</div>
            <div>Price</div>
            <div>Discount</div>
            <div></div>
          </TableHeader>
          {bookings?.map((booking) => (
            <BookingRow key={booking.id} booking={booking} />
          ))}
        </Table>
      </Menus>
    </div>
  );
}

export default BookingTable;
