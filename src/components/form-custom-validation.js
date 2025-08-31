export const customValidationTitleHandler = (event) => {
  event.target.setCustomValidity("");

  if (event.target.validity.valueMissing) {
    event.target.setCustomValidity("Title is required.");
    return;
  }

  if (event.target.validity.tooShort) {
    event.target.setCustomValidity(
      `Title must be at least ${event.target.minLength} characters.`
    );
    return;
  }

  if (event.target.validity.tooLong) {
    event.target.setCustomValidity(
      `Title cannot exceed ${event.target.maxLength} characters.`
    );
    return;
  }
};

export const customValidationBodyHandler = (event) => {
  event.target.setCustomValidity("");

  if (event.target.validity.valueMissing) {
    event.target.setCustomValidity("Note content is required.");
    return;
  }

  if (event.target.validity.tooShort) {
    event.target.setCustomValidity(
      `Note content must be at least ${event.target.minLength} characters.`
    );
    return;
  }

  if (event.target.validity.tooLong) {
    event.target.setCustomValidity(
      `Note content cannot exceed ${event.target.maxLength} characters.`
    );
    return;
  }
};
