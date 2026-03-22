import { useCallback, useMemo, useState } from "react";
import {
  MENTION_CANDIDATES,
  type MentionCandidate,
  type MentionType,
} from "@/data/legal-context";

export interface MentionState {
  isOpen: boolean;
  query: string;
  selectedCategory: MentionType | null;
  highlightedIndex: number;
  selectedMentions: MentionCandidate[];
  caretIndex: number | null; // position of the `@` in the text
}

export function useMentionDetection() {
  const [state, setState] = useState<MentionState>({
    isOpen: false,
    query: "",
    selectedCategory: null,
    highlightedIndex: 0,
    selectedMentions: [],
    caretIndex: null,
  });

  const candidatesByType = useMemo(() => {
    const grouped: Record<MentionType, MentionCandidate[]> = {
      document: [],
      matter: [],
      client: [],
    };
    MENTION_CANDIDATES.forEach((c) => grouped[c.type].push(c));
    return grouped;
  }, []);

  const filteredCandidates = useMemo(() => {
    const query = state.query.toLowerCase();

    if (state.selectedCategory) {
      const items = candidatesByType[state.selectedCategory];
      if (!query) return items;
      return items.filter(
        (c) =>
          c.label.toLowerCase().includes(query) ||
          c.subtitle?.toLowerCase().includes(query),
      );
    }

    if (query) {
      return MENTION_CANDIDATES.filter(
        (c) =>
          c.label.toLowerCase().includes(query) ||
          c.subtitle?.toLowerCase().includes(query),
      );
    }

    return [];
  }, [state.query, state.selectedCategory, candidatesByType]);

  const showCategories = state.isOpen && !state.query && !state.selectedCategory;

  const openPicker = useCallback((caretIndex: number) => {
    setState((s) => ({
      ...s,
      isOpen: true,
      query: "",
      selectedCategory: null,
      highlightedIndex: 0,
      caretIndex,
    }));
  }, []);

  const closePicker = useCallback(() => {
    setState((s) => ({
      ...s,
      isOpen: false,
      query: "",
      selectedCategory: null,
      highlightedIndex: 0,
      caretIndex: null,
    }));
  }, []);

  const setQuery = useCallback((query: string) => {
    setState((s) => ({ ...s, query, highlightedIndex: 0 }));
  }, []);

  const selectCategory = useCallback((type: MentionType) => {
    setState((s) => ({
      ...s,
      selectedCategory: type,
      highlightedIndex: 0,
    }));
  }, []);

  const goBack = useCallback(() => {
    setState((s) => ({
      ...s,
      selectedCategory: null,
      highlightedIndex: 0,
    }));
  }, []);

  const moveHighlight = useCallback(
    (direction: 1 | -1) => {
      setState((s) => {
        const count = filteredCandidates.length;
        if (count === 0) return s;
        const next =
          (s.highlightedIndex + direction + count) % count;
        return { ...s, highlightedIndex: next };
      });
    },
    [filteredCandidates.length],
  );

  const setHighlightedIndex = useCallback((index: number) => {
    setState((s) => ({ ...s, highlightedIndex: index }));
  }, []);

  const commitMention = useCallback(
    (candidate: MentionCandidate) => {
      setState((s) => ({
        ...s,
        isOpen: false,
        query: "",
        selectedCategory: null,
        highlightedIndex: 0,
        caretIndex: null,
        selectedMentions: s.selectedMentions.some(
          (m) => m.label === candidate.label && m.type === candidate.type,
        )
          ? s.selectedMentions
          : [...s.selectedMentions, candidate],
      }));
    },
    [],
  );

  const commitHighlighted = useCallback(() => {
    if (filteredCandidates.length > 0) {
      commitMention(filteredCandidates[state.highlightedIndex]);
    }
  }, [filteredCandidates, state.highlightedIndex, commitMention]);

  const removeMention = useCallback((index: number) => {
    setState((s) => ({
      ...s,
      selectedMentions: s.selectedMentions.filter((_, i) => i !== index),
    }));
  }, []);

  const clearMentions = useCallback(() => {
    setState((s) => ({ ...s, selectedMentions: [] }));
  }, []);

  // Detect @ in text based on cursor position
  const detectMention = useCallback(
    (text: string, cursorPos: number | null) => {
      if (cursorPos === null) {
        closePicker();
        return;
      }

      // Look backward from cursor for `@`
      const textBeforeCursor = text.slice(0, cursorPos);
      const atIndex = textBeforeCursor.lastIndexOf("@");

      if (atIndex === -1) {
        if (state.isOpen) closePicker();
        return;
      }

      // Check that there's no space between @ and the start (or it's at the start)
      const charBefore = atIndex > 0 ? text[atIndex - 1] : " ";
      if (charBefore !== " " && charBefore !== "\n" && atIndex !== 0) {
        if (state.isOpen) closePicker();
        return;
      }

      const query = textBeforeCursor.slice(atIndex + 1);

      // If query has a space, close
      if (query.includes(" ")) {
        if (state.isOpen) closePicker();
        return;
      }

      if (!state.isOpen) {
        openPicker(atIndex);
      }
      setQuery(query);
    },
    [state.isOpen, openPicker, closePicker, setQuery],
  );

  return {
    ...state,
    showCategories,
    filteredCandidates,
    candidatesByType,
    detectMention,
    openPicker,
    closePicker,
    setQuery,
    selectCategory,
    goBack,
    moveHighlight,
    setHighlightedIndex,
    commitMention,
    commitHighlighted,
    removeMention,
    clearMentions,
  };
}
