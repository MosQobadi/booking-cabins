import styled from "styled-components";
import Spinner from "../../ui/Spinner";
import Menus from "../../ui/Menus";
import Empty from "../../ui/Empty";
import { useBookings } from "./useBookings";
import BookingRow from "./BookingRow";
import Pagination from "../../ui/Pagination";

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

const Footer = styled.footer`
  background-color: var(--color-grey-50);
  display: flex;
  justify-content: center;
  padding: 1.2rem;

  &:not(:has(*)) {
    display: none;
  }
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
        <Footer>
          <Pagination count={count} />
        </Footer>
      </Menus>
    </div>
  );
}

export default BookingTable;
