const newFormHandler = async (event) => {
  event.preventDefault();

  const name = document.querySelector('#title').value.trim();
  const description = document.querySelector('#post').value.trim();

  console.log('Payload:', { name, description });

  if (name && description) {
    const response = await fetch(`/api/projects`, {
      method: 'POST',
      body: JSON.stringify({ name, description }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      document.location.replace('/profile');
    } else {
      const errorData = await response.json();
      console.error('Error response:', errorData);
      alert(`Failed to create project: ${errorData.message}`);
    }
  } else {
    alert('Please enter a project name and description.');
  }
};

const delButtonHandler = async (event) => {
  if (event.target.hasAttribute('data-id')) {
    const id = event.target.getAttribute('data-id');

    const response = await fetch(`/api/projects/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      document.location.replace('/profile');
    } else {
      alert('Failed to delete project');
    }
  }
};

document
  .querySelector('.new-post-form')
  .addEventListener('submit', newFormHandler);

document
  .querySelector('.all-posts')
  .addEventListener('click', delButtonHandler);
