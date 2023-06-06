export const Modal = () => {
  const modal = document.getElementById('demo-modal');
  const btn = document.getElementById('open-modal');
  const close = modal.getElementsByClassName('close')[0];

  // When the user clicks the button, open the modal.
  btn.onclick = () => {
    modal.style.display = 'block';
  };

  // When the user clicks on 'X', close the modal
  close.onclick = () => {
    modal.style.display = 'none';
  };

  // When the user clicks outside the modal -- close it.
  window.onclick = (event) => {
    if (event.target === modal) {
      // Which means he clicked somewhere in the modal (background area), but not target = modal-content
      modal.style.display = 'none';
    }
  };
};

