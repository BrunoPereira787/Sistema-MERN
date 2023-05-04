export const API_URL = "http://localhost:5000";

export function GET_PETS() {
  return {
    url: API_URL + "/pets",
    options: {
      method: "GET",
    },
  };
}

export function GET_PET_DETAILS(id) {
  return {
    url: API_URL + `/pets/pet/${id}`,
    options: {
      method: "GET",
    },
  };
}

export function POST_PET(token, formData) {
  return {
    url: API_URL + "/pets/create",
    options: {
      method: "POST",
      headers: {
        Authorization: "Bearer " + token,
      },
      body: formData,
    },
  };
}

export function CONCLUDES_ADOPTIONS(token, id) {
  return {
    url: API_URL + `/pets/concludes/${id}`,
    options: {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  };
}

export function UPDATE_PET(id, token, formData) {
  return {
    url: API_URL + `/pets/updatepet/${id}`,
    options: {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    },
  };
}

export function DELETE_PET(token, id) {
  return {
    url: API_URL + `/pets/deletepet/${id}`,
    options: {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  };
}

export function LOGIN_USER(user) {
  return {
    url: API_URL + "/users/login",
    options: {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    },
  };
}

export function GET_USER_TOKEN(token) {
  return {
    url: API_URL + "/users/user",
    options: {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  };
}

export function GET_USER(token) {
  return {
    url: API_URL + "/users/user",
    options: {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  };
}

export function UPDATE_USER(token, data) {
  return {
    url: API_URL + "/users/edit",
    options: {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    },
  };
}

export function DELETE_USER(token) {
  return {
    url: API_URL + "/users/delete",
    options: {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  };
}

export function GET_MY_PETS(token) {
  return {
    url: API_URL + "/pets/mypets",
    options: {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token,
      },
    },
  };
}
