<div class="alert alert--js">
  <p class="alert__message alert__message--js"></p>
  <button
    class="button alert__button alert__button--js-close"
    aria-label="Close alert box"
  >
    <svg class="alert__svg" viewBox="0 0 512 512">
      <use href="assets/svg/icons.svg#close" />
    </svg>
  </button>
</div>
<main
  id="page-container"
  class="page-container page-container--visible page-container--js"
  role="main"
>
  <form autocomplete="off" class="form form--js" role="form">
    <h2 class="form__heading">Contact Me</h2>
    <p class="input input--name">
      <input
        type="text"
        id="userName"
        class="input__data input__data--js input__data--js-userName"
        maxlength="50"
        name="userName"
        placeholder="your name"
      />
      <label for="userName" class="input__label">Name:</label>
    </p>
    <div class="input input--email">
      <input
        type="text"
        id="userEmail"
        class="input__data input__data--js input__data--js-userEmail"
        maxlength="30"
        name="userEmail"
        placeholder="your e-mail address"
      />
      <label for="userEmail" class="input__label">E-mail:</label>
    </div>
    <div class="error error--email">
      <p class="error__text error__text--js-email"></p>
    </div>
    <p class="input input--title">
      <input
        type="text"
        id="userTitle"
        class="input__data input__data--js input__data--js-userTitle"
        maxlength="50"
        name="userTitle"
        placeholder="title of your message"
      />
      <label for="userTitle" class="input__label">Title:</label>
    </p>
    <div class="input input--phone">
      <div class="input__phone">
        <input
          type="tel"
          id="userCountryCode"
          name="userCountryCode"
          class="input__data input__data--phone input__data--js input__data--js-userCountryCode"
          maxlength="4"
          placeholder="+00"
        />
        <input
          type="tel"
          id="userPhone"
          class="input__data input__data--phone input__data--js input__data--js-userPhone"
          name="userPhone"
          placeholder="123-456-789"
        />
      </div>
      <label for="userPhone" class="input__label">Phone:</label>
    </div>
    <div class="error error--phone">
      <p class="error__text error__text--js-phone"></p>
    </div>
    <p class="input input--message">
      <textarea
        id="userMessage"
        class="input__data input__data--message input__data--js input__data--js-userMessage"
        name="userMessage"
        rows="10"
        cols="10"
        placeholder="write your message"
      ></textarea>
      <label for="userMessage" class="input__label">Message:</label>
    </p>
    <div class="error error--message">
      <p class="error__text error__text--js-message"></p>
    </div>
    <fieldset class="form__verification form__verification--js">
      <legend class="form__question visuallyhidden">Are you a robot?</legend>
      <label for="checkboxReject" class="checkbox">
        <input
          type="checkbox"
          id="checkboxReject"
          class="checkbox__input checkbox__input--js checkbox__input--js-reject"
          name="reject"
        />
        <span class="checkbox__field" tabindex="0"></span>
        <svg class="checkbox__mark checkbox__mark--js" viewBox="0 0 24 24">
          <use href="assets/svg/icons.svg#checkmark" />
        </svg>
        <span class="checkbox__text">I'm a robot</span>
      </label>
      <label for="checkboxAccept" class="checkbox">
        <input
          type="checkbox"
          id="checkboxAccept"
          class="checkbox__input checkbox__input--js checkbox__input--js-accept"
          name="accept"
        />
        <span class="checkbox__field" tabindex="0"></span>
        <svg class="checkbox__mark checkbox__mark--js" viewBox="0 0 24 24">
          <use href="assets/svg/icons.svg#checkmark" />
        </svg>
        <span class="checkbox__text">I'm not a robot</span>
      </label>
      <label for="checkboxOptional" class="checkbox">
        <input
          type="checkbox"
          id="checkboxOptional"
          class="checkbox__input checkbox__input--js checkbox__input--js-optional"
          name="optional"
        />
        <span class="checkbox__field" tabindex="0"></span>
        <svg class="checkbox__mark checkbox__mark--js" viewBox="0 0 24 24">
          <use href="assets/svg/icons.svg#checkmark" />
        </svg>
        <span class="checkbox__text">I wish I was...</span>
      </label>
    </fieldset>
    <button
      type="submit"
      id="formSubmit"
      class="button form__submit form__submit--js"
      aria-label="Submit form"
    >
      SEND
    </button>
  </form>
</main>
