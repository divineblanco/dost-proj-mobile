// import { ThemedText } from "@/components/themed-text";
// import { ThemedView } from "@/components/themed-view";
// import { createAuthStyles } from "@/styles/auth-styles";
// import { icon, useResponsive } from "@/styles/responsive";
// import { FontAwesome6, MaterialIcons } from "@expo/vector-icons";
// import React, { useMemo } from "react";
// import { Pressable } from "react-native";

// export type RoleOption = {
//   label: string;
//   icon: string;
//   color: string;
//   bg: string;
// };

// export const ROLE_OPTIONS: RoleOption[] = [
//   { label: "General Public", icon: "person",          color: "#41A5EE", bg: "#EEF7FE" },
//   { label: "Government",     icon: "building-columns", color: "#20BF55", bg: "#EDFAF3" },
//   { label: "Researcher",     icon: "magnifying-glass", color: "#E53935", bg: "#FFF0F0" },
//   { label: "NGO",            icon: "building-ngo",     color: "#1C5E3F", bg: "#E8F5EE" },
//   { label: "Institution",   icon: "people-group",     color: "#35408E", bg: "#EEF0FA" },
// ];

// type Props = {
//   selected: number | null;
//   onSelect: (index: number) => void;
// };

// export function SelectRole({ selected, onSelect }: Props) {
//   const r = useResponsive();
//   const styles = useMemo(() => createAuthStyles(r), [r]);

//   return (
//     <ThemedView style={styles.grid}>
//       {ROLE_OPTIONS.map((item, index) => {
//         const isSelected = selected === index;
//         return (
//           <Pressable
//             key={index}
//             style={[styles.box, isSelected && styles.boxSelected]}
//             onPress={() => onSelect(index)}
//           >
//             <ThemedView style={[styles.iconBubble, { backgroundColor: item.bg }]}>
//               <FontAwesome6
//                 name={item.icon as keyof typeof FontAwesome6.glyphMap}
//                 size={icon(25)}
//                 color={item.color}
//               />
//             </ThemedView>

//             <ThemedText style={[styles.boxTitle, isSelected && styles.boxTitleSelected]}>
//               {item.label}
//             </ThemedText>

//             <ThemedView style={[styles.check, isSelected && styles.checkSelected]}>
//               {isSelected && (
//                 <MaterialIcons name="check" size={icon(9.5)} color="#FFFFFF" />
//               )}
//             </ThemedView>
//           </Pressable>
//         );
//       })}
//     </ThemedView>
//   );
// }
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import useFormQuery from "@/lib/hooks/useFormQuery";
import { createAuthStyles } from "@/styles/auth-styles";
import { icon, useResponsive } from "@/styles/responsive";
import { FontAwesome6, MaterialIcons } from "@expo/vector-icons";
import React, { useMemo } from "react";
import { ActivityIndicator, Pressable } from "react-native";

/**
 * ============================================================
 * ROLE OPTION
 * ============================================================
 *
 * This is the role object used by the registration screen.
 *
 * role_id comes directly from:
 * GET /maintenance/roles
 */
export type RoleOption = {
  role_id: string;
  name: string;
  slug: string;
  description?: string;

  // UI-only properties
  icon: string;
  color: string;
  bg: string;
};

/**
 * ============================================================
 * ROLE UI CONFIGURATION
 * ============================================================
 *
 * IMPORTANT:
 *
 * The icon names below must exist in FontAwesome6.glyphMap.
 *
 * We use valid FontAwesome6 icons instead of names such as
 * "building-ngo", which is not a valid FontAwesome6 icon.
 */
const ROLE_UI: Record<
  string,
  Omit<RoleOption, "role_id" | "name" | "slug" | "description">
> = {
  "general-public": {
    icon: "user",
    color: "#41A5EE",
    bg: "#e1f1fd",
  },

  "government-agencies": {
    icon: "building-columns",
    color: "#20BF55",
    bg: "#EDFAF3",
  },

  "researcher": {
    icon: "magnifying-glass",
    color: "#E53935",
    bg: "#FFF0F0",
  },

  "ngo-agencies": {
    icon: "building-ngo",
    color: "#1C5E3F",
    bg: "#E8F5EE",
  },

  "institution-agencies": {
    icon: "people-group",
    color: "#35408E",
    bg: "#EEF0FA",
  },
};


/**
 * ============================================================
 * FALLBACK UI
 * ============================================================
 *
 * If the backend contains a role that does not have a specific
 * UI configuration, this will be used.
 */
const DEFAULT_ROLE_UI = {
  icon: "user",
  color: "#35408E",
  bg: "#EEF0FA",
};

/**
 * ============================================================
 * ROLES TO HIDE
 * ============================================================
 *
 * These roles can still exist in the database/API.
 *
 * We simply don't show them as registration choices.
 */
const HIDDEN_ROLE_SLUGS = new Set([
  "super-administrator",
  "super_admin",
  "superadmin",
  "developer",
]);

/**
 * We also check the name because the backend may use a different
 * slug format.
 */
const HIDDEN_ROLE_NAMES = new Set([
  "super administrator",
  "developer",
]);

/**
 * ============================================================
 * API RESPONSE TYPES
 * ============================================================
 */

type RoleApiNode = {
  role_id: string;
  name: string;
  slug: string;
  description?: string;
  is_deleted?: boolean;
};

type RolesResponse = {
  data?: {
    edges?: Array<{
      node: RoleApiNode;
      cursor: string;
    }>;
  };
};

/**
 * ============================================================
 * PROPS
 * ============================================================
 *
 * selected is now the actual role_id.
 *
 * This is important because the API requires the role_id,
 * not the array index.
 */
type Props = {
  selected: string | null;
  onSelect: (role: RoleOption) => void;
};

/**
 * ============================================================
 * SELECT ROLE
 * ============================================================
 */
export function SelectRole({
  selected,
  onSelect,
}: Props) {
  const r = useResponsive();

  const styles = useMemo(
    () => createAuthStyles(r),
    [r]
  );

  /**
   * ==========================================================
   * GET ROLES
   * ==========================================================
   *
   * GET /maintenance/roles
   */
  const {
    data,
    isLoading,
    isError,
    error,
  } = useFormQuery<
    RolesResponse,
    Record<string, never>
  >({
    key: ["maintenance-roles"],
    url: "/maintenance/roles",
    enabled: true,
  });

  /**
   * ==========================================================
   * BUILD ROLE OPTIONS
   * ==========================================================
   *
   * The API provides:
   *
   * role_id
   * name
   * slug
   * description
   *
   * We preserve those values and only add UI information.
   */
  const roleOptions = useMemo<RoleOption[]>(() => {
    const edges = data?.data?.edges ?? [];

    return edges
      .filter(({ node }) => {
        /**
         * ------------------------------------------------------
         * Remove deleted roles
         * ------------------------------------------------------
         */
        if (node.is_deleted) {
          return false;
        }

        /**
         * ------------------------------------------------------
         * Remove Super Administrator and Developer
         * ------------------------------------------------------
         */
        const normalizedSlug = node.slug
          ?.trim()
          .toLowerCase()
          .replace(/_/g, "-")
          .replace(/\s+/g, "-");

        const normalizedName = node.name
          ?.trim()
          .toLowerCase();

        if (
          HIDDEN_ROLE_SLUGS.has(normalizedSlug) ||
          HIDDEN_ROLE_NAMES.has(normalizedName)
        ) {
          return false;
        }

        return true;
      })
      .map(({ node }) => {
        /**
         * Get the UI configuration for this role.
         */
        const ui =
          ROLE_UI[node.slug] ??
          DEFAULT_ROLE_UI;

        return {
          /**
           * IMPORTANT:
           *
           * This is the actual database role_id.
           */
          role_id: node.role_id,

          /**
           * Backend role name.
           */
          name: node.name,

          /**
           * Backend slug.
           */
          slug: node.slug,

          /**
           * Backend description.
           */
          description: node.description,

          /**
           * UI icon/color/background.
           */
          ...ui,
        };
      });
  }, [data]);

  /**
   * ==========================================================
   * LOADING
   * ==========================================================
   */
  if (isLoading) {
    return (
      <ThemedView
        style={{
          paddingVertical: r.spacing(24),
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <ActivityIndicator
          size="small"
          color="#35408E"
        />

        <ThemedText
          style={{
            marginTop: r.spacing(8),
            color: "#9BA8C0",
          }}
        >
          Loading roles...
        </ThemedText>
      </ThemedView>
    );
  }

  /**
   * ==========================================================
   * ERROR
   * ==========================================================
   */
  if (isError) {
    console.log(
      "[SelectRole] Failed to load roles:",
      error
    );

    return (
      <ThemedView
        style={{
          paddingVertical: r.spacing(16),
        }}
      >
        <ThemedText
          style={{
            color: "#E53935",
            textAlign: "center",
          }}
        >
          Unable to load roles. Please try again.
        </ThemedText>
      </ThemedView>
    );
  }

  /**
   * ==========================================================
   * EMPTY
   * ==========================================================
   */
  if (!roleOptions.length) {
    return (
      <ThemedView
        style={{
          paddingVertical: r.spacing(16),
        }}
      >
        <ThemedText
          style={{
            color: "#9BA8C0",
            textAlign: "center",
          }}
        >
          No roles available.
        </ThemedText>
      </ThemedView>
    );
  }

  /**
   * ==========================================================
   * RENDER
   * ==========================================================
   */
  return (
    <ThemedView style={styles.grid}>
      {roleOptions.map((item) => {
        /**
         * IMPORTANT:
         *
         * Selection is based on role_id.
         *
         * NOT the array index.
         */
        const isSelected =
          selected === item.role_id;

        return (
          <Pressable
            key={item.role_id}
            style={[
              styles.box,
              isSelected &&
                styles.boxSelected,
            ]}
            onPress={() => {
              /**
               * Return the entire role object.
               *
               * The parent now has:
               *
               * role.role_id
               * role.name
               * role.slug
               * role.description
               */
              onSelect(item);
            }}
          >
            {/* ==================================================
                ICON
            ================================================== */}
            <ThemedView
              style={[
                styles.iconBubble,
                {
                  backgroundColor: item.bg,
                },
              ]}
            >
              <FontAwesome6
                name={
                  item.icon as keyof typeof FontAwesome6.glyphMap
                }
                size={icon(25)}
                color={item.color}
              />
            </ThemedView>

            {/* ==================================================
                ROLE NAME
            ================================================== */}
            <ThemedText
              style={[
                styles.boxTitle,
                isSelected &&
                  styles.boxTitleSelected,
              ]}
            >
              {item.name}
            </ThemedText>

            {/* ==================================================
                CHECK
            ================================================== */}
            <ThemedView
              style={[
                styles.check,
                isSelected &&
                  styles.checkSelected,
              ]}
            >
              {isSelected && (
                <MaterialIcons
                  name="check"
                  size={icon(9.5)}
                  color="#FFFFFF"
                />
              )}
            </ThemedView>
          </Pressable>
        );
      })}
    </ThemedView>
  );
}
