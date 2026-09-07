// import { ThemedView } from "@/components/themed-view";
// import {
//   questionTwoDropdownMaxHeight,
//   questionTwoStyles,
// } from "@/styles/contribute/contribute-question-styles";
// import { icon, useResponsive } from "@/styles/responsive";
// import { Ionicons } from "@expo/vector-icons";
// import React, { useMemo, useState } from "react";
// import {
//   ScrollView,
//   TouchableOpacity,
//   View,
// } from "react-native";
// import { ThemedText } from "../themed-text";

// export type QuestionTwoValue = {
//   region: string | null;
//   province: string | null;
//   city: string | null;
//   barangay: string | null;
// };

// type QuestionTwoProps = {
//   value: QuestionTwoValue;
//   onChange: (value: QuestionTwoValue) => void;
// };

// export function QuestionTwo({
//   value,
//   onChange,
// }: QuestionTwoProps) {

//   const [activeDropdown, setActiveDropdown] =
//     useState<string | null>(null);

//   const r = useResponsive();

//   const styles = useMemo(
//     () => questionTwoStyles(r),
//     [r]
//   );

//   const dropdownData: Record<
//     string,
//     string[]
//   > = {

//     region: [
//       "Region I",
//       "Region II",
//       "Region III",
//       "Region IV-A",
//       "Region IV-B",
//       "Region V",
//       "Region VI",
//       "Region VII",
//       "Region VIII",
//       "Region IX",
//       "Region X",
//       "Region XI",
//       "Region XII",
//       "Region XIII",
//       "NCR",
//     ],

//     province: [
//       "Laguna",
//       "Batangas",
//       "Cavite",
//       "Quezon",
//       "Rizal",
//     ],

//     city: [
//       "Calamba",
//       "San Pedro",
//       "Biñan",
//       "Sta. Rosa",
//       "Cabuyao",
//       "Los Baños",
//     ],

//     barangay: [
//       "Barangay 1",
//       "Barangay 2",
//       "Barangay 3",
//       "Barangay 4",
//       "Barangay 5",
//     ],
//   };

//   const toggle = (key: string) => {
//     setActiveDropdown((prev) =>
//       prev === key ? null : key
//     );
//   };

//   const updateValue = (
//     key: keyof QuestionTwoValue,
//     selectedValue: string
//   ) => {

//     onChange({
//       ...value,
//       [key]: selectedValue,
//     });

//     setActiveDropdown(null);
//   };

//   const topFields = [
//     {
//       key: "region",
//       label: "Region",
//       value: value.region,
//     },
//     {
//       key: "province",
//       label: "Province",
//       value: value.province,
//     },
//     {
//       key: "city",
//       label: "City/Municipality",
//       value: value.city,
//     },
//   ] as const;

//   const DropdownField = ({
//     fieldKey,
//     value: fieldValue,
//     label,
//   }: {
//     fieldKey: keyof QuestionTwoValue;
//     value: string | null;
//     label: string;
//   }) => {

//     const isActive =
//       activeDropdown === fieldKey;

//     return (
//       <View
//         style={[
//           styles.fieldCol,
//           isActive &&
//             styles.activeField,
//         ]}
//       >

//         <ThemedText style={styles.fieldLabel}>
//           {label}
//         </ThemedText>

//         <TouchableOpacity
//           style={[
//             styles.trigger,
//             isActive &&
//               styles.triggerOpen,
//             !!fieldValue &&
//               styles.triggerFilled,
//           ]}
//           onPress={() =>
//             toggle(fieldKey)
//           }
//           activeOpacity={0.8}
//         >

//           <ThemedText
//             style={[
//               styles.triggerText,
//               !fieldValue &&
//                 styles.triggerPlaceholder,
//             ]}
//             numberOfLines={1}
//           >
//             {fieldValue ?? label}
//           </ThemedText>

//           <Ionicons
//             name={
//               isActive
//                 ? "chevron-up"
//                 : "chevron-down"
//             }
//             size={icon(13)}
//             color={
//               isActive
//                 ? "#35408E"
//                 : "#9BA8C0"
//             }
//           />

//         </TouchableOpacity>

//         {isActive && (

//           <View
//             style={styles.dropdownList}
//           >

//             <ScrollView
//               nestedScrollEnabled
//               showsVerticalScrollIndicator={false}
//               style={{
//                 maxHeight:
//                   questionTwoDropdownMaxHeight,
//               }}
//             >

//               {dropdownData[
//                 fieldKey
//               ].map((item) => {

//                 const isSelected =
//                   fieldValue === item;

//                 return (
//                   <TouchableOpacity
//                     key={item}
//                     style={[
//                       styles.dropdownItem,
//                       isSelected &&
//                         styles.dropdownItemActive,
//                     ]}
//                     onPress={() =>
//                       updateValue(
//                         fieldKey,
//                         item
//                       )
//                     }
//                     activeOpacity={0.7}
//                   >

//                     <ThemedText
//                       style={[
//                         styles.dropdownText,
//                         isSelected &&
//                           styles.dropdownTextActive,
//                       ]}
//                     >
//                       {item}
//                     </ThemedText>

//                     {isSelected && (
//                       <Ionicons
//                         name="checkmark"
//                         size={icon(13)}
//                         color="#35408E"
//                       />
//                     )}

//                   </TouchableOpacity>
//                 );
//               })}

//             </ScrollView>

//           </View>
//         )}

//       </View>
//     );
//   };

//   return (
//     <ThemedView style={styles.wrapper}>

//       {/* TOP */}

//       <View style={styles.topRow}>

//         {topFields.map(
//           ({
//             key,
//             label,
//             value: fieldValue,
//           }) => (

//             <DropdownField
//               key={key}
//               fieldKey={key}
//               label={label}
//               value={fieldValue}
//             />

//           )
//         )}

//       </View>

//       {/* BOTTOM */}

//       <View style={styles.bottomRow}>

//         <DropdownField
//           fieldKey="barangay"
//           label="Barangay"
//           value={value.barangay}
//         />

//         <TouchableOpacity
//           style={styles.locationBtn}
//           activeOpacity={0.85}
//         >
//           <Ionicons
//             name="location"
//             size={icon(18)}
//             color="#FFFFFF"
//           />
//         </TouchableOpacity>

//       </View>

//     </ThemedView>
//   );
// }

import { ThemedView } from "@/components/themed-view";
import {
  questionTwoDropdownMaxHeight,
  questionTwoStyles,
} from "@/styles/contribute/contribute-question-styles";
import { icon, useResponsive } from "@/styles/responsive";
import { Ionicons } from "@expo/vector-icons";
import React, {
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  ActivityIndicator,
  ScrollView,
  TouchableOpacity,
  View,
} from "react-native";
import { ThemedText } from "../themed-text";

import {
  GeomItem,
  getBarangays,
  getMunicipalities,
  getProvinces,
  getRegions,
} from "@/lib/services/geomApi";

export type QuestionTwoValue = {
  region: string | null;
  province: string | null;
  city: string | null;
  barangay: string | null;
};

type QuestionTwoProps = {
  value: QuestionTwoValue;
  onChange: (value: QuestionTwoValue) => void;
};

type LocationSelection = {
  region?: GeomItem | null;
  province?: GeomItem | null;
  city?: GeomItem | null;
  barangay?: GeomItem | null;
};

export function QuestionTwo({
  value,
  onChange,
}: QuestionTwoProps) {
  const r = useResponsive();

  const styles = useMemo(
    () => questionTwoStyles(r),
    [r],
  );

  /*
   * =====================================================
   * API DATA
   * =====================================================
   */

  const [regionOptions, setRegionOptions] =
    useState<GeomItem[]>([]);

  const [provinceOptions, setProvinceOptions] =
    useState<GeomItem[]>([]);

  const [cityOptions, setCityOptions] =
    useState<GeomItem[]>([]);

  const [barangayOptions, setBarangayOptions] =
    useState<GeomItem[]>([]);

  /*
   * =====================================================
   * SELECTED OBJECTS
   *
   * We keep the actual API objects here because the
   * QuestionTwoValue only stores the display names.
   *
   * Example:
   *
   * region:
   * {
   *   id: 4,
   *   code: "040000000",
   *   name: "Region IV-A (CALABARZON)"
   * }
   * =====================================================
   */

  const [selectedRegion, setSelectedRegion] =
    useState<GeomItem | null>(null);

  const [selectedProvince, setSelectedProvince] =
    useState<GeomItem | null>(null);

  const [selectedCity, setSelectedCity] =
    useState<GeomItem | null>(null);

  const [selectedBarangay, setSelectedBarangay] =
    useState<GeomItem | null>(null);

  /*
   * =====================================================
   * DROPDOWN STATE
   * =====================================================
   */

  const [
    activeDropdown,
    setActiveDropdown,
  ] = useState<keyof QuestionTwoValue | null>(
    null,
  );

  /*
   * =====================================================
   * LOADING STATE
   * =====================================================
   */

  const [loadingRegions, setLoadingRegions] =
    useState(false);

  const [loadingProvinces, setLoadingProvinces] =
    useState(false);

  const [
    loadingMunicipalities,
    setLoadingMunicipalities,
  ] = useState(false);

  const [loadingBarangays, setLoadingBarangays] =
    useState(false);

  /*
   * =====================================================
   * ERROR STATE
   * =====================================================
   */

  const [error, setError] = useState<string | null>(
    null,
  );

  /*
   * =====================================================
   * LOAD REGIONS
   *
   * Runs once when QuestionTwo mounts.
   * =====================================================
   */

  useEffect(() => {
    let mounted = true;

    const loadRegions = async () => {
      try {
        setLoadingRegions(true);
        setError(null);

        console.log("Loading regions...");

        const data = await getRegions();

        console.log(
          "Regions loaded:",
          JSON.stringify(data),
        );

        if (!mounted) return;

        setRegionOptions(data);
      } catch (err) {
        console.error(
          "Failed to load regions:",
          err,
        );

        if (!mounted) return;

        setError(
          "Failed to load regions.",
        );
      } finally {
        if (mounted) {
          setLoadingRegions(false);
        }
      }
    };

    loadRegions();

    return () => {
      mounted = false;
    };
  }, []);

  /*
   * =====================================================
   * RESTORE REGION OBJECT
   *
   * If the parent component already has a region value,
   * find its corresponding API object.
   * =====================================================
   */

  useEffect(() => {
    if (!value.region) {
      setSelectedRegion(null);
      return;
    }

    const region = regionOptions.find(
      (item) => item.name === value.region,
    );

    if (region) {
      setSelectedRegion(region);
    }
  }, [value.region, regionOptions]);

  /*
   * =====================================================
   * LOAD PROVINCES
   *
   * IMPORTANT:
   *
   * Backend GetProvinces() does:
   *
   * WHERE r.region_id = $1
   *
   * Therefore we send:
   *
   * selectedRegion.id
   *
   * NOT selectedRegion.code.
   *
   * =====================================================
   */

  useEffect(() => {
    if (!selectedRegion) {
      setProvinceOptions([]);
      return;
    }

    let mounted = true;

    const loadProvinces = async () => {
      try {
        setLoadingProvinces(true);
        setError(null);

        console.log(
          "Loading provinces for region:",
          selectedRegion.id,
          selectedRegion.name,
        );

        const data = await getProvinces(
          selectedRegion.id,
        );

        console.log(
          "Provinces loaded:",
          JSON.stringify(data),
        );

        if (!mounted) return;

        setProvinceOptions(data);
      } catch (err) {
        console.error(
          "Failed to load provinces:",
          err,
        );

        if (!mounted) return;

        setProvinceOptions([]);

        setError(
          "Failed to load provinces.",
        );
      } finally {
        if (mounted) {
          setLoadingProvinces(false);
        }
      }
    };

    loadProvinces();

    return () => {
      mounted = false;
    };
  }, [selectedRegion]);

  /*
   * =====================================================
   * RESTORE PROVINCE OBJECT
   * =====================================================
   */

  useEffect(() => {
    if (!value.province) {
      setSelectedProvince(null);
      return;
    }

    const province = provinceOptions.find(
      (item) => item.name === value.province,
    );

    if (province) {
      setSelectedProvince(province);
    }
  }, [value.province, provinceOptions]);

  /*
   * =====================================================
   * LOAD MUNICIPALITIES / CITIES
   *
   * Backend expects:
   *
   * province_code
   *
   * and its SQL compares it with:
   *
   * p.ogc_fid = $1
   *
   * Therefore we send:
   *
   * selectedProvince.id
   *
   * =====================================================
   */

  useEffect(() => {
    /*
     * NCR does not have a province.
     *
     * Your current backend endpoint for municipalities
     * requires province_code, so we cannot call it using
     * a province for NCR.
     *
     * If your backend has NCR municipalities represented
     * through another relationship, that would require a
     * backend endpoint/change.
     *
     * For now, this component does not invent NCR data.
     */

    if (!selectedProvince) {
      setCityOptions([]);
      return;
    }

    let mounted = true;

    const loadMunicipalities = async () => {
      try {
        setLoadingMunicipalities(true);
        setError(null);

        console.log(
          "Loading municipalities for province:",
          selectedProvince.id,
          selectedProvince.code,
          selectedProvince.name,
        );

        /*
         * Your backend GetMunicipalities() expects
         * province_code but internally compares it to
         * p.ogc_fid.
         *
         * Therefore send the province ID.
         */
        const data = await getMunicipalities(
          selectedProvince.id,
        );

        console.log(
          "Municipalities loaded:",
          JSON.stringify(data),
        );

        if (!mounted) return;

        setCityOptions(data);
      } catch (err) {
        console.error(
          "Failed to load municipalities:",
          err,
        );

        if (!mounted) return;

        setCityOptions([]);

        setError(
          "Failed to load cities/municipalities.",
        );
      } finally {
        if (mounted) {
          setLoadingMunicipalities(false);
        }
      }
    };

    loadMunicipalities();

    return () => {
      mounted = false;
    };
  }, [selectedProvince]);

  /*
   * =====================================================
   * RESTORE CITY OBJECT
   * =====================================================
   */

  useEffect(() => {
    if (!value.city) {
      setSelectedCity(null);
      return;
    }

    const city = cityOptions.find(
      (item) => item.name === value.city,
    );

    if (city) {
      setSelectedCity(city);
    }
  }, [value.city, cityOptions]);

  /*
   * =====================================================
   * LOAD BARANGAYS
   *
   * Backend expects:
   *
   * municipalityId
   *
   * and SQL does:
   *
   * WHERE m.ogc_fid = $1
   *
   * Therefore send:
   *
   * selectedCity.id
   * =====================================================
   */

  useEffect(() => {
    if (!selectedCity) {
      setBarangayOptions([]);
      return;
    }

    let mounted = true;

    const loadBarangays = async () => {
      try {
        setLoadingBarangays(true);
        setError(null);

        console.log(
          "Loading barangays for municipality:",
          selectedCity.id,
          selectedCity.name,
        );

        const data = await getBarangays(
          selectedCity.id,
        );

        console.log(
          "Barangays loaded:",
          JSON.stringify(data),
        );

        if (!mounted) return;

        setBarangayOptions(data);
      } catch (err) {
        console.error(
          "Failed to load barangays:",
          err,
        );

        if (!mounted) return;

        setBarangayOptions([]);

        setError(
          "Failed to load barangays.",
        );
      } finally {
        if (mounted) {
          setLoadingBarangays(false);
        }
      }
    };

    loadBarangays();

    return () => {
      mounted = false;
    };
  }, [selectedCity]);

  /*
   * =====================================================
   * RESTORE BARANGAY OBJECT
   * =====================================================
   */

  useEffect(() => {
    if (!value.barangay) {
      setSelectedBarangay(null);
      return;
    }

    const barangay = barangayOptions.find(
      (item) => item.name === value.barangay,
    );

    if (barangay) {
      setSelectedBarangay(barangay);
    }
  }, [value.barangay, barangayOptions]);

  /*
   * =====================================================
   * OPTIONS FOR EACH DROPDOWN
   * =====================================================
   */

  const dropdownData: Record<
    keyof QuestionTwoValue,
    GeomItem[]
  > = {
    region: regionOptions,
    province: provinceOptions,
    city: cityOptions,
    barangay: barangayOptions,
  };

  /*
   * =====================================================
   * FIELD DISABLED LOGIC
   * =====================================================
   */

  const isFieldDisabled = (
    key: keyof QuestionTwoValue,
  ) => {
    if (key === "region") {
      return false;
    }

    if (key === "province") {
      return !selectedRegion;
    }

    if (key === "city") {
      return !selectedProvince;
    }

    if (key === "barangay") {
      return !selectedCity;
    }

    return false;
  };

  /*
   * =====================================================
   * LOADING LOGIC
   * =====================================================
   */

  const isLoading = (
    key: keyof QuestionTwoValue,
  ) => {
    if (key === "region") {
      return loadingRegions;
    }

    if (key === "province") {
      return loadingProvinces;
    }

    if (key === "city") {
      return loadingMunicipalities;
    }

    if (key === "barangay") {
      return loadingBarangays;
    }

    return false;
  };

  /*
   * =====================================================
   * TOGGLE DROPDOWN
   * =====================================================
   */

  const toggle = (
    key: keyof QuestionTwoValue,
  ) => {
    if (isFieldDisabled(key)) {
      return;
    }

    const options = dropdownData[key];

    if (
      !options ||
      options.length === 0
    ) {
      return;
    }

    setActiveDropdown((prev) =>
      prev === key ? null : key,
    );
  };

  /*
   * =====================================================
   * SELECT REGION
   * =====================================================
   */

  const selectRegion = (
    item: GeomItem,
  ) => {
    console.log(
      "Selected region:",
      item,
    );

    setSelectedRegion(item);

    /*
     * Clear everything below region.
     */
    setSelectedProvince(null);
    setSelectedCity(null);
    setSelectedBarangay(null);

    setProvinceOptions([]);
    setCityOptions([]);
    setBarangayOptions([]);

    /*
     * Update parent form.
     */
    onChange({
      region: item.name,
      province: null,
      city: null,
      barangay: null,
    });

    setActiveDropdown(null);
  };

  /*
   * =====================================================
   * SELECT PROVINCE
   * =====================================================
   */

  const selectProvince = (
    item: GeomItem,
  ) => {
    console.log(
      "Selected province:",
      item,
    );

    setSelectedProvince(item);

    /*
     * Clear everything below province.
     */
    setSelectedCity(null);
    setSelectedBarangay(null);

    setCityOptions([]);
    setBarangayOptions([]);

    onChange({
      ...value,
      province: item.name,
      city: null,
      barangay: null,
    });

    setActiveDropdown(null);
  };

  /*
   * =====================================================
   * SELECT CITY / MUNICIPALITY
   * =====================================================
   */

  const selectCity = (
    item: GeomItem,
  ) => {
    console.log(
      "Selected city/municipality:",
      item,
    );

    setSelectedCity(item);

    /*
     * Clear barangay.
     */
    setSelectedBarangay(null);
    setBarangayOptions([]);

    onChange({
      ...value,
      city: item.name,
      barangay: null,
    });

    setActiveDropdown(null);
  };

  /*
   * =====================================================
   * SELECT BARANGAY
   * =====================================================
   */

  const selectBarangay = (
    item: GeomItem,
  ) => {
    console.log(
      "Selected barangay:",
      item,
    );

    setSelectedBarangay(item);

    onChange({
      ...value,
      barangay: item.name,
    });

    setActiveDropdown(null);
  };

  /*
   * =====================================================
   * GENERIC SELECT
   * =====================================================
   */

  const updateValue = (
    key: keyof QuestionTwoValue,
    item: GeomItem,
  ) => {
    if (key === "region") {
      selectRegion(item);
      return;
    }

    if (key === "province") {
      selectProvince(item);
      return;
    }

    if (key === "city") {
      selectCity(item);
      return;
    }

    if (key === "barangay") {
      selectBarangay(item);
      return;
    }
  };

  /*
   * =====================================================
   * DROPDOWN FIELD
   * =====================================================
   */

  const DropdownField = ({
    fieldKey,
    value: fieldValue,
    label,
  }: {
    fieldKey: keyof QuestionTwoValue;
    value: string | null;
    label: string;
  }) => {
    const isActive =
      activeDropdown === fieldKey;

    const disabled =
      isFieldDisabled(fieldKey);

    const loading =
      isLoading(fieldKey);

    const options =
      dropdownData[fieldKey] ?? [];

    return (
      <View
        style={[
          styles.fieldCol,
          isActive &&
            styles.activeField,
        ]}
      >
        <ThemedText
          style={styles.fieldLabel}
        >
          {label}
        </ThemedText>

        <TouchableOpacity
          style={[
            styles.trigger,
            isActive &&
              styles.triggerOpen,
            !!fieldValue &&
              styles.triggerFilled,
            disabled && {
              opacity: 0.5,
            },
          ]}
          onPress={() =>
            toggle(fieldKey)
          }
          activeOpacity={0.8}
          disabled={
            disabled ||
            loading
          }
        >
          <ThemedText
            style={[
              styles.triggerText,
              !fieldValue &&
                styles.triggerPlaceholder,
            ]}
            numberOfLines={1}
          >
            {fieldValue ?? label}
          </ThemedText>

          {loading ? (
            <ActivityIndicator
              size="small"
              color="#35408E"
            />
          ) : (
            <Ionicons
              name={
                isActive
                  ? "chevron-up"
                  : "chevron-down"
              }
              size={icon(13)}
              color={
                isActive
                  ? "#35408E"
                  : "#9BA8C0"
              }
            />
          )}
        </TouchableOpacity>

        {isActive &&
          options.length > 0 && (
            <View
              style={
                styles.dropdownList
              }
            >
              <ScrollView
                nestedScrollEnabled
                showsVerticalScrollIndicator={
                  false
                }
                style={{
                  maxHeight:
                    questionTwoDropdownMaxHeight,
                }}
              >
                {options.map(
                  (item) => {
                    const isSelected =
                      fieldValue ===
                      item.name;

                    return (
                      <TouchableOpacity
                        key={`${item.code}-${item.id}`}
                        style={[
                          styles.dropdownItem,
                          isSelected &&
                            styles.dropdownItemActive,
                        ]}
                        onPress={() =>
                          updateValue(
                            fieldKey,
                            item,
                          )
                        }
                        activeOpacity={
                          0.7
                        }
                      >
                        <ThemedText
                          style={[
                            styles.dropdownText,
                            isSelected &&
                              styles.dropdownTextActive,
                          ]}
                          numberOfLines={
                            2
                          }
                        >
                          {item.name}
                        </ThemedText>

                        {isSelected && (
                          <Ionicons
                            name="checkmark"
                            size={icon(
                              13,
                            )}
                            color="#35408E"
                          />
                        )}
                      </TouchableOpacity>
                    );
                  },
                )}
              </ScrollView>
            </View>
          )}

        {isActive &&
          !loading &&
          options.length === 0 && (
            <View
              style={
                styles.dropdownList
              }
            >
              <View
                style={{
                  padding:
                    14,
                }}
              >
                <ThemedText
                  style={
                    styles.dropdownText
                  }
                >
                  No {label.toLowerCase()}{" "}
                  available.
                </ThemedText>
              </View>
            </View>
          )}
      </View>
    );
  };

  /*
   * =====================================================
   * RENDER
   * =====================================================
   */

  return (
    <ThemedView
      style={styles.wrapper}
    >
      {/* ERROR MESSAGE */}

      {error && (
        <View
          style={{
            marginBottom: 8,
          }}
        >
          <ThemedText
            style={{
              color: "#D32F2F",
              fontSize: 12,
            }}
          >
            {error}
          </ThemedText>
        </View>
      )}

      {/* TOP */}

      <View
        style={styles.topRow}
      >
        <DropdownField
          fieldKey="region"
          label="Region"
          value={value.region}
        />

        <DropdownField
          fieldKey="province"
          label="Province"
          value={value.province}
        />

        <DropdownField
          fieldKey="city"
          label="City/Municipality"
          value={value.city}
        />
      </View>

      {/* BOTTOM */}

      <View
        style={styles.bottomRow}
      >
        <DropdownField
          fieldKey="barangay"
          label="Barangay"
          value={value.barangay}
        />

        <TouchableOpacity
          style={
            styles.locationBtn
          }
          activeOpacity={0.85}
        >
          <Ionicons
            name="location"
            size={icon(18)}
            color="#FFFFFF"
          />
        </TouchableOpacity>
      </View>
    </ThemedView>
  );
}
