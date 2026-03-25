import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  createAddress,
  deleteAddress,
  getAddresses,
  getApiErrorMessage,
  updateAddress,
} from "../../ApiService/api";
import "./AddressBook.css";

const emptyAddressForm = {
  fullName: "",
  phone: "",
  line1: "",
  line2: "",
  city: "",
  state: "",
  postalCode: "",
  country: "India",
  isDefault: false,
};

const AddressBook = () => {
  const [addresses, setAddresses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [editingAddressId, setEditingAddressId] = useState(null);
  const [formValues, setFormValues] = useState(emptyAddressForm);

  const loadAddresses = async () => {
    try {
      setIsLoading(true);
      const savedAddresses = await getAddresses();
      setAddresses(savedAddresses);
    } catch (error) {
      toast.error(
        getApiErrorMessage(error, "Unable to load your addresses right now.")
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadAddresses();
  }, []);

  const resetForm = () => {
    setEditingAddressId(null);
    setFormValues(emptyAddressForm);
  };

  const handleInputChange = (event) => {
    const { name, value, type, checked } = event.target;

    setFormValues((currentValues) => ({
      ...currentValues,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setIsSaving(true);

      if (editingAddressId) {
        await updateAddress(editingAddressId, formValues);
        toast.success("Address updated successfully.");
      } else {
        await createAddress(formValues);
        toast.success("Address added successfully.");
      }

      resetForm();
      await loadAddresses();
    } catch (error) {
      toast.error(
        getApiErrorMessage(error, "Unable to save this address right now.")
      );
    } finally {
      setIsSaving(false);
    }
  };

  const handleEdit = (address) => {
    setEditingAddressId(address.id);
    setFormValues({
      fullName: address.fullName,
      phone: address.phone,
      line1: address.line1,
      line2: address.line2 || "",
      city: address.city,
      state: address.state,
      postalCode: address.postalCode,
      country: address.country,
      isDefault: address.isDefault,
    });
  };

  const handleDelete = async (addressId) => {
    const shouldDelete = window.confirm("Do you want to remove this address?");

    if (!shouldDelete) {
      return;
    }

    try {
      await deleteAddress(addressId);
      toast.success("Address removed successfully.");

      if (editingAddressId === addressId) {
        resetForm();
      }

      await loadAddresses();
    } catch (error) {
      toast.error(
        getApiErrorMessage(error, "Unable to delete this address right now.")
      );
    }
  };

  return (
    <section className="address-book-section">
      <div className="address-book-header">
        <div>
          <p className="address-book-kicker">Address Book</p>
          <h2 className="address-book-title">Manage your delivery addresses</h2>
        </div>
      </div>

      <div className="address-book-grid">
        <article className="address-book-panel">
          <div className="address-form-header">
            <div>
              <p className="address-panel-kicker">
                {editingAddressId ? "Edit Address" : "Add Address"}
              </p>
              <h3 className="address-panel-title">
                {editingAddressId
                  ? "Update the selected delivery address"
                  : "Save a new address for future orders"}
              </h3>
            </div>

            {editingAddressId ? (
              <button
                type="button"
                className="address-secondary-btn"
                onClick={resetForm}
              >
                Cancel Edit
              </button>
            ) : null}
          </div>

          <form className="address-form-grid" onSubmit={handleSubmit}>
            <label className="address-form-field">
              <span>Full Name</span>
              <input
                type="text"
                name="fullName"
                value={formValues.fullName}
                onChange={handleInputChange}
                placeholder="Enter receiver name"
              />
            </label>

            <label className="address-form-field">
              <span>Phone</span>
              <input
                type="text"
                name="phone"
                value={formValues.phone}
                onChange={handleInputChange}
                placeholder="Enter phone number"
              />
            </label>

            <label className="address-form-field address-form-field-full">
              <span>Address Line 1</span>
              <input
                type="text"
                name="line1"
                value={formValues.line1}
                onChange={handleInputChange}
                placeholder="House number, street, area"
              />
            </label>

            <label className="address-form-field address-form-field-full">
              <span>Address Line 2</span>
              <input
                type="text"
                name="line2"
                value={formValues.line2}
                onChange={handleInputChange}
                placeholder="Apartment, landmark, optional"
              />
            </label>

            <label className="address-form-field">
              <span>City</span>
              <input
                type="text"
                name="city"
                value={formValues.city}
                onChange={handleInputChange}
                placeholder="Enter city"
              />
            </label>

            <label className="address-form-field">
              <span>State</span>
              <input
                type="text"
                name="state"
                value={formValues.state}
                onChange={handleInputChange}
                placeholder="Enter state"
              />
            </label>

            <label className="address-form-field">
              <span>Postal Code</span>
              <input
                type="text"
                name="postalCode"
                value={formValues.postalCode}
                onChange={handleInputChange}
                placeholder="Enter postal code"
              />
            </label>

            <label className="address-form-field">
              <span>Country</span>
              <input
                type="text"
                name="country"
                value={formValues.country}
                onChange={handleInputChange}
                placeholder="Enter country"
              />
            </label>

            <label className="address-checkbox">
              <input
                type="checkbox"
                name="isDefault"
                checked={formValues.isDefault}
                onChange={handleInputChange}
              />
              <span>Use this as my default address</span>
            </label>

            <div className="address-form-actions">
              <button type="submit" className="address-submit-btn" disabled={isSaving}>
                {isSaving
                  ? editingAddressId
                    ? "Updating..."
                    : "Saving..."
                  : editingAddressId
                  ? "Update Address"
                  : "Save Address"}
              </button>
            </div>
          </form>
        </article>

        <article className="address-book-panel">
          <p className="address-panel-kicker">Saved Addresses</p>
          <h3 className="address-panel-title">Choose where orders should arrive</h3>

          {isLoading ? (
            <div className="address-empty-state">Loading addresses...</div>
          ) : null}

          {!isLoading && addresses.length === 0 ? (
            <div className="address-empty-state">
              No saved addresses yet. Add your first delivery address here.
            </div>
          ) : null}

          {!isLoading && addresses.length > 0 ? (
            <div className="address-list">
              {addresses.map((address) => (
                <article className="address-card" key={address.id}>
                  <div className="address-card-top">
                    <div>
                      <h4 className="address-card-name">{address.fullName}</h4>
                      <p className="address-card-phone">{address.phone}</p>
                    </div>

                    {address.isDefault ? (
                      <span className="address-default-badge">Default</span>
                    ) : null}
                  </div>

                  <p className="address-card-lines">
                    {address.line1}
                    {address.line2 ? `, ${address.line2}` : ""}
                  </p>
                  <p className="address-card-lines">
                    {address.city}, {address.state} - {address.postalCode}
                  </p>
                  <p className="address-card-lines">{address.country}</p>

                  <div className="address-card-actions">
                    <button type="button" onClick={() => handleEdit(address)}>
                      Edit
                    </button>
                    <button
                      type="button"
                      className="danger"
                      onClick={() => handleDelete(address.id)}
                    >
                      Delete
                    </button>
                  </div>
                </article>
              ))}
            </div>
          ) : null}
        </article>
      </div>
    </section>
  );
};

export default AddressBook;
