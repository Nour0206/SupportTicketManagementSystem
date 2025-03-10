import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { createTicket, reset } from "../features/tickets/ticketSlice";
import Spinner from "../components/Spinner";
import { BackButton } from "../components/BackButton";

function NewTicket() {
  const { user } = useSelector((state) => state.auth);
  const { isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.tickets
  );

  // States for ticket creation
  const [name, setname] = useState(""); // The ticket name field (description/issue title)
  const [content, setContent] = useState(""); // Detailed description of the issue

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (isError) {
      toast.error(message); // Show error if any
    }
    if (isSuccess) {
      dispatch(reset()); // Reset state after success
      navigate("/ticketsUser"); // Redirect to tickets page
    }

    return () => {
      dispatch(reset()); // Cleanup on unmount
    };
  }, [isError, isSuccess, message, dispatch, navigate]);

  // Handle ticket form submission
  const onSubmit = (e) => {
    e.preventDefault();
    // Dispatch createTicket with name, content, and assignedTo
    dispatch(createTicket({ name, content, createdBy: user.userId }));
  };

  if (isLoading) {
    return <Spinner />; // Show loading spinner while waiting
  }

  return (
    <>
      <BackButton url="/" />
      <section className="heading">
        <h1>Create New Ticket</h1>
        <p>Please fill out the form below</p>
      </section>

      <section className="form">
        <form onSubmit={onSubmit}>
          {/* Ticket Name Field */}
          <div className="form-group">
            <label htmlFor="name">Ticket Name</label>
            <input
              type="text"
              className="form-control"
              id="name"
              value={name}
              onChange={(e) => setname(e.target.value)} // Handle ticket name change
              placeholder="Enter a short name or title for the ticket"
              required
            />
          </div>

          {/* Description of Issue Field */}
          <div className="form-group">
            <label htmlFor="content">Description of Issue</label>
            <textarea
              name="content"
              id="content"
              className="form-control"
              placeholder="Describe the issue in detail"
              value={content}
              onChange={(e) => setContent(e.target.value)} // Handle content change
              required
            ></textarea>
          </div>

          <div className="form-group">
            <button className="btn btn-block">Submit</button>
          </div>
        </form>
      </section>
    </>
  );
}

export default NewTicket;
