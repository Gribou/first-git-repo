export const GALLERY_TAG = "GALLERY";
const GALLERY_API_ROOT = "gallery/";

export const endpoints = (builder) => ({
  gallery: builder.query({
    query: () => GALLERY_API_ROOT,
    providesTags: [GALLERY_TAG],
  }),
  importPicture: builder.mutation({
    query: (file) => {
      const form = new FormData();
      form.append("file", file);
      return {
        url: GALLERY_API_ROOT,
        method: "POST",
        data: form,
        headers: { "Content-Type": "multipart/form-data" },
      };
    },
    invalidatesTags: [GALLERY_TAG],
  }),
  destroyPicture: builder.mutation({
    query: (pk) => ({
      url: `${GALLERY_API_ROOT}${pk}/`,
      method: "DELETE",
    }),
    invalidatesTags: [GALLERY_TAG],
  }),
});
