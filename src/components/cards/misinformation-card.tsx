import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { useAuth } from "@/lib/auth/AuthProvider";
import {
  API_KEY_VALUE,
  API_URL,
} from "@/lib/services/api";
import { misinformationCardStyles } from "@/styles/home-styles";
import { icon, useResponsive } from "@/styles/responsive";
import { Ionicons } from "@expo/vector-icons";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

type BackendContribution = {
  contribution_id: string;
  type: string;
  content: string;
  classification:
    | "PENDING"
    | "MISINFORMATION"
    | "FACTUAL";
  status:
    | "PENDING"
    | "APPROVED"
    | "DECLINED";
  is_deleted: boolean;
};

type MisinformationItem = {
  id: string;
  type: string;
  content: string;
};

export function MisinformationCard() {

  const r = useResponsive();
  const styles = useMemo(
    () =>
      misinformationCardStyles(r),
    [r]
  );


  /*
   * ==================================================
   * API
   * ==================================================
   */

  // const API_URL =
  //   process.env.EXPO_PUBLIC_API_URL;

  // const API_KEY =
  //   process.env.EXPO_PUBLIC_API_KEY;


  /*
   * ==================================================
   * AUTH
   * ==================================================
   */

  const {
    token,
    isLoading: authLoading,
  } = useAuth();


  /*
   * ==================================================
   * STATE
   * ==================================================
   */

  const [
    misinformation,
    setMisinformation,
  ] = useState<MisinformationItem[]>([]);

  const [
    loading,
    setLoading,
  ] = useState(true);


  /*
   * ==================================================
   * LOAD APPROVED MISINFORMATION
   * ==================================================
   */

  const loadMisinformation =
    useCallback(async () => {

      /*
       * ------------------------------------------------
       * WAIT FOR AUTHENTICATION
       * ------------------------------------------------
       */

      if (
        authLoading ||
        !token
      ) {
        return;
      }


      /*
       * ------------------------------------------------
       * CHECK API CONFIGURATION
       * ------------------------------------------------
       */

      if (!API_URL || !API_KEY_VALUE) {
        console.error(
          "[MISINFORMATION CARD] Missing API configuration"
        );
        setMisinformation([]);
        setLoading(false);
        return;
      }


      try {

        setLoading(true);


        /*
         * ==================================================
         * GET CONTRIBUTIONS
         * ==================================================
         */

        const response = await fetch(
          `${API_URL}/maintenance/contribution`,
          {
            method: "GET",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
              "X-API-Key": API_KEY_VALUE,
            },
          }
        );


        /*
         * ==================================================
         * PARSE RESPONSE
         * ==================================================
         */

        const result =
          await response.json();


        /*
         * ==================================================
         * HANDLE API ERROR
         * ==================================================
         */

        if (!response.ok) {

          console.error(
            "[MISINFORMATION CARD] API error:",
            result
          );

          setMisinformation([]);

          return;
        }


        /*
         * ==================================================
         * EXTRACT EDGES
         * ==================================================
         */

        const edges =
          Array.isArray(
            result?.data?.edges
          )
            ? result.data.edges
            : [];


        /*
         * ==================================================
         * EXTRACT NODES
         * ==================================================
         */

        const rawData:
          BackendContribution[] =
          edges
            .map(
              (
                edge: {
                  node?: BackendContribution;
                }
              ) =>
                edge?.node
            )
            .filter(
              (
                node:
                  | BackendContribution
                  | undefined
              ): node is BackendContribution =>
                !!node
            );


        /*
         * ==================================================
         * ONLY SHOW APPROVED MISINFORMATION
         * ==================================================
         *
         * Requirements:
         *
         * classification = MISINFORMATION
         * status = APPROVED
         * is_deleted = false
         */

        const approvedMisinformation =
          rawData.filter(
            (item) =>
              !item.is_deleted &&
              item.classification ===
                "MISINFORMATION" &&
              item.status ===
                "APPROVED"
          );


        /*
         * ==================================================
         * SHOW AT LEAST 2 ALERTS
         * ==================================================
         *
         * Take the first two approved misinformation
         * posts returned by the backend.
         *
         */

        const mapped:
          MisinformationItem[] =
          approvedMisinformation
            .slice(0, 2)
            .map((item) => ({
              id:
                item.contribution_id,

              type:
                item.type ||
                "Misinformation",

              content:
                item.content ||
                "No content available.",
            }));


        /*
         * ==================================================
         * SAVE MISINFORMATION
         * ==================================================
         */

        setMisinformation(
          mapped
        );

      } catch (error) {

        console.error(
          "[MISINFORMATION CARD] Failed to load misinformation:",
          error
        );

        setMisinformation([]);

      } finally {

        setLoading(false);
      }

    }, [
      token,
      authLoading,
    ]);

  useEffect(() => {
    loadMisinformation();
  }, [
    loadMisinformation,
  ]);


  /*
   * ==================================================
   * RENDER
   * ==================================================
   */

  return (
    <>
      {loading ? (

        <ThemedView style={ styles.misinfoBG }>
          <ThemedView style={ styles.redLine }/>
          <ThemedView style={ styles.misinfoContainer }>
            <Ionicons
              name="warning-outline"
              size={icon(20)}
              color="red"
              style={ styles.warningIcon }/>

            <ThemedView style={ styles.misinfoInfo }>
              <ThemedText style={ styles.misinfoTitle}>
                Loading...
              </ThemedText>
              <ThemedText style={[ styles.misinfoDesc,
                  {
                    flexShrink: 1,
                  },
                ]}
              >
                Loading approved misinformation...
              </ThemedText>
            </ThemedView>
          </ThemedView>
        </ThemedView>
      ) : misinformation.length === 0 ? (

        <ThemedView style={ styles.misinfoBG }>
          <ThemedView style={ styles.redLine }/>
          <ThemedView style={ styles.misinfoContainer }>
            <Ionicons
              name="warning-outline"
              size={icon(20)}
              color="red"
              style={ styles.warningIcon }
            />
            <ThemedView style={ styles.misinfoInfo }>
              <ThemedText style={ styles.misinfoTitle }>
                No approved misinformation
              </ThemedText>
              <ThemedText style={[ styles.misinfoDesc,
                  {
                    flexShrink: 1,
                  },
                ]}
              >
                No approved misinformation posts available.
              </ThemedText>
            </ThemedView>
          </ThemedView>
        </ThemedView>

      ) : (

        /*
         * ==================================================
         * SHOW THE APPROVED MISINFORMATION ALERTS
         * ==================================================
         */

        misinformation.map(
          (item) => (
            <ThemedView
              key={item.id}
              style={
                styles.misinfoBG
              }
            >

              {/* RED ALERT LINE */}
              <ThemedView style={styles.redLine}/>
              <ThemedView style={ styles.misinfoContainer}>

                {/* WARNING ICON */}
                <Ionicons
                  name="warning-outline"
                  size={icon(20)}
                  color="red"
                  style={ styles.warningIcon }
                />

                <ThemedView style={ styles.misinfoInfo }>

                  {/* TYPE OF MISINFORMATION */}
                  <ThemedText style={ styles.misinfoTitle}>
                    {item.type}
                  </ThemedText>


                  {/* CONTENT */}
                  <ThemedText style={[ styles.misinfoDesc,
                      {
                        flexShrink: 1,
                      },
                    ]}
                  >
                    {item.content}
                  </ThemedText>
                </ThemedView>
              </ThemedView>
            </ThemedView>
          )
        )
      )}
    </>
  );
}
