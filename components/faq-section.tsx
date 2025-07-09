"use client"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

const faqs = [
  {
    question: "Como funciona o período de teste gratuito?",
    answer:
      "Você tem 14 dias para testar todos os recursos do plano Pro gratuitamente. Não é necessário cartão de crédito para começar. Após o período, você pode escolher continuar com um plano pago ou usar a versão gratuita.",
  },
  {
    question: "Posso cancelar minha assinatura a qualquer momento?",
    answer:
      "Sim, você pode cancelar sua assinatura a qualquer momento através do painel de controle. Não há taxas de cancelamento e você continuará tendo acesso aos recursos até o final do período pago.",
  },
  {
    question: "Meus dados estão seguros?",
    answer:
      "Absolutamente. Utilizamos criptografia de ponta, backups automáticos e seguimos as melhores práticas de segurança. Somos compatíveis com LGPD e outras regulamentações de proteção de dados.",
  },
  {
    question: "Posso mudar de plano depois?",
    answer:
      "Sim, você pode fazer upgrade ou downgrade do seu plano a qualquer momento. As mudanças são aplicadas imediatamente e o valor é ajustado proporcionalmente.",
  },
  {
    question: "Há limite de usuários por conta?",
    answer:
      "O plano Starter é para uso individual. O plano Pro permite até 10 usuários, e o Enterprise não tem limite de usuários. Usuários adicionais no Pro custam R$ 5 por usuário/mês.",
  },
  {
    question: "Vocês oferecem suporte técnico?",
    answer:
      "Sim! Oferecemos suporte por email para todos os planos, suporte prioritário para o plano Pro, e suporte 24/7 com gerente dedicado para o plano Enterprise.",
  },
  {
    question: "Posso integrar com outras ferramentas?",
    answer:
      "Sim, oferecemos integrações com mais de 100 ferramentas populares como Slack, GitHub, Google Workspace, Microsoft 365, Zapier e muitas outras.",
  },
  {
    question: "Há desconto para pagamento anual?",
    answer:
      "Sim! Oferecemos 20% de desconto para pagamentos anuais em todos os planos pagos. O desconto é aplicado automaticamente na finalização da compra.",
  },
]

export default function FAQSection() {
  return (
    <section className="bg-gray-50 dark:bg-gray-900/50 py-24 sm:py-32">
      <div className="mx-auto max-w-4xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-base font-semibold leading-7 text-purple-600 dark:text-purple-400">FAQ</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
            Perguntas Frequentes
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
            Tire suas dúvidas sobre nossa plataforma e serviços.
          </p>
        </div>

        <div className="mt-16">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="border rounded-lg px-6">
                <AccordionTrigger className="text-left hover:no-underline">
                  <span className="font-medium">{faq.question}</span>
                </AccordionTrigger>
                <AccordionContent className="text-gray-600 dark:text-gray-300 pb-4">{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-600 dark:text-gray-300">
            Não encontrou sua resposta?{" "}
            <a href="#" className="font-medium text-purple-600 hover:text-purple-500">
              Entre em contato conosco
            </a>
          </p>
        </div>
      </div>
    </section>
  )
}
