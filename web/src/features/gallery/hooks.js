import api from "api";
import moment from "moment-timezone";
import { useDispatch } from "react-redux";
import Compressor from "compressorjs";
import { displayMessage } from "features/messages";

export const {
  useGalleryQuery,
  useImportPictureMutation,
  useDestroyPictureMutation,
} = api;

function formatTimestamp(timestamp) {
  return moment(timestamp).format("YYYYMMDD_HHmmss");
}

function makePictureTitle(file) {
  const ext = file.name.split(".").pop();
  return `${formatTimestamp(file.lastModified)}.${ext}`;
}

export const MAX_FILE_SIZE = 5 * 1024 * 1024; //5 Mb in bytes

export function usePictureImport() {
  const dispatch = useDispatch();
  const [importPicture, status] = useImportPictureMutation();

  const trigger = (file) => {
    if (file) {
      if (file.size > MAX_FILE_SIZE) {
        dispatch(displayMessage("L'image fournie est trop grosse (> 5Mo)."));
      } else {
        try {
          new Compressor(file, {
            quality: 0.8,
            success: (blob) =>
              importPicture(new File([blob], makePictureTitle(file))),
          });
        } catch (Error) {
          dispatch(
            displayMessage(`Ce fichier n'est pas une image (${file.name}).`)
          );
        }
      }
    }
  };

  return [trigger, status];
}
