const showRecipeFavourite = document.querySelector('.showRecipeFavourite');

showRecipeFavourite.addEventListener('click', async (event) => {
  if (event.target.name === 'deleteBtn') {
    const { id } = event.target.parentNode;
    try {
      const response = await fetch(`/recipe/favorite/${id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
      });

      const result = await response.json();
      if (result.status === 200) {
        showRecipeFavourite.firstChild.remove();
        const inviteBtn = document.createElement('button');
        inviteBtn.name = 'inviteBtn';
        inviteBtn.classList = 'text-secondary-700 hover:text-white border border-secondary-700 hover:bg-secondary-700 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center m-1';
        inviteBtn.innerText = 'Add to favoutites';
        inviteBtn.type = 'button';
        showRecipeFavourite.append(inviteBtn);
      }
    } catch (error) {
      console.log(error);
    }
  }
  if (event.target.name === 'inviteBtn') {
    const { id } = event.target.parentNode;
    try {
      const response = await fetch(`/recipe/favorite/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
      });

      const result = await response.json();
      if (result.status === 200) {
        showRecipeFavourite.firstChild.remove();
        const deleteBtn = document.createElement('button');
        deleteBtn.name = 'deleteBtn';
        deleteBtn.classList = 'text-white hover:text-secondary-700 border bg-green-700 hover:bg-white hover:border-secondary-700 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center m-1';
        deleteBtn.innerText = 'Remove from favourites';
        deleteBtn.type = 'button';
        showRecipeFavourite.append(deleteBtn);
      }
    } catch (error) {
      console.log(error);
    }
  }
});
