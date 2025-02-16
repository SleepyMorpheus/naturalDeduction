import { Card, SimpleGrid } from "@mantine/core";
import {
  DerivationRule as DerivationRuleType,
  RuleFormula,
  useAllRulesQuery,
} from "@/lib/api";
import { useDraggable } from "@dnd-kit/core";
import DerivationRule, { RuleProps } from "@/lib/components/rule/rule";

const DraggableRule = ({ rule }: RuleProps) => {
  // return <DerivationRule rule={rule} />;

  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({ id: rule.name });
  return (
    <Card
      withBorder
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      style={{
        cursor: "grab",
        transform: transform
          ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
          : undefined,
      }}
      py={"xs"}
    >
      <DerivationRule rule={rule} />
    </Card>
  );
};

const Rules = () => {
  const {
    data: rules,
    error: rulesError,
    isLoading: rulesLoading,
  } = useAllRulesQuery();

  return (
    <>
      {rules &&
        rules.map((rule) => {
          return <DraggableRule key={rule.name} rule={rule} />;
        })}
    </>
  );
};

export default Rules;
