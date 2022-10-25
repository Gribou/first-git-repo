import { useParams } from "react-router";
import { useProfileQuery } from "api";

export function useCurrentProfile() {
  const { profile, folder } = useParams();
  const { data: profiles_config, ...rest } = useProfileQuery();
  const current_profile = profile
    ? profiles_config?.profiles?.find(({ url }) => url === profile)
    : profiles_config?.default_profile || {};
  return {
    current_profile,
    current_folder: folder,
    ...(profiles_config || {}),
    ...rest,
  };
}
