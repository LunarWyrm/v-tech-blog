document.getElementById('comment-form').addEventListener('submit', async (event) => {
    event.preventDefault();
  
    const text = document.getElementById('comment-text').value.trim();
    const projectId = document.getElementById('project-id').value;
  
    if (text && projectId) {
      const response = await fetch('/comment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text, project_id: projectId }),
      });
  
      if (response.ok) {
        document.location.reload();
      } else {
        alert('Failed to post comment.');
      }
    }

    const project = await Project.findByPk(projectId, {
      include: [
        {
          model: Comment,
          include: [User],
        },
      ],
    });
  });