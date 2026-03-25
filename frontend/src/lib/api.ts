const BASE_URL = "https://ai-assessment-creator-d117.onrender.com";

export async function createAssignment(data: any) {
  const res = await fetch(`${BASE_URL}/api/assignment/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return res.json();
}

export async function getAssignment(jobId: string) {
  const res = await fetch(`${BASE_URL}/api/assignment/${jobId}`);
  return res.json();
}

export async function getAllAssignments() {
  const res = await fetch(`${BASE_URL}/api/assignment`);
  return res.json();
}

export async function deleteAssignment(jobId: string) {
  const res = await fetch(
    `${BASE_URL}/api/assignment/${jobId}`,
    {
      method: "DELETE",
    }
  );

  return res.json();
}