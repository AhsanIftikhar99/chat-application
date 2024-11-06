export type FormField = {
  label: string;
  type: string;
  name?: string;
  baseline?: boolean;
  placeholder?: string;
  maxLength?: number;
  required?: boolean;
  pattern?: string;
  minLength?: number;
};

export type FormFieldProps = {
  field: FormField;
};

export type User = {
  id: string;
  displayName: string;
  username: string;
  icon?: string;
};

export type NewMessageFieldProps = {
  users: User[];
  onUserSelect: (user: User) => void;
};

export type Message = {
  id: string;
  chatId: string;
  senderId: string;
  content: string;
  messageType: string;
  timestamp: string;
};
