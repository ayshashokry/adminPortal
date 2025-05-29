import { Checkbox } from "radix-ui";
import { CheckIcon } from "@radix-ui/react-icons";

interface PasswordRule {
  id: number;
  name: string;
  regex: RegExp;
}

interface PasswordChecklistProps {
  confirmChecks?: PasswordRule[];
  methods: any;
}

export default function PasswordChecklist({ confirmChecks, methods }: PasswordChecklistProps) {
  const passwordValue=methods.watch("newPassword")
  return (
    <div className="w-[100%] grid grid-cols-2">
      {confirmChecks?.map((item: PasswordRule) => (
        <Checkbox.Root
          key={item.id}
          checked={item.regex.test(passwordValue)}
          className="flex mb-4"
        >
          <CheckIcon
            className={`w-4 h-4 border-2 rounded-[50px] mr-2 mt-.5 ${
              item.regex.test(passwordValue)
                ? " border-green text-green"
                : " border-gray3 text-transparent"
            }`}
          />
          <span className="text-grayBasic text-sm font-normal not-italic">{item.name}</span>
          <Checkbox.Indicator />
        </Checkbox.Root>
      ))}
    </div>
  );
}
