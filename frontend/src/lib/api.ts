export async function createAssignment(data: any) {
  const res = await fetch("http://localhost:5000/api/assignment/create", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return res.json();
}

export async function getAssignment(jobId: string) {
  const res = await fetch(`http://localhost:5000/api/assignment/${jobId}`);
  return res.json();
}

export async function getAllAssignments() {
  const res = await fetch("http://localhost:5000/api/assignment");
  return res.json();
}


export async function deleteAssignment(jobId: string) {
  const res = await fetch(
    `http://localhost:5000/api/assignment/${jobId}`,
    {
      method: "DELETE",
    }
  );

  return res.json();
}