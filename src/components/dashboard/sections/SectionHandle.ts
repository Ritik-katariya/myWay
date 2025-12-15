export type SectionHandle = {
  save: () => void | Promise<void>;
  isValid?: () => boolean;
};
