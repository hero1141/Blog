<template>
  <v-app id="inspire">
    <v-content>
      <v-container fluid>
        <v-layout align-center justify-center>
            <v-flex xs12 sm12 md12>
                <h1>Przygotowanie do gry i jej ogólny przebieg</h1>
                <h4 style="margin-top: 25px">Zanim przystąpisz do gry, oprócz talii przyda Ci się również  zestaw znaczników (np. kostek lub monet) i tokenów oraz coś do zapisywania stanu żyć. Jeśli Twoja talia zawiera jakieś wartościowe karty, warto zaopatrzyć się w specjalne koszulki na karty (deck protektory). Poniżej opiszę, jak w uproszczeniu wygląda przebieg meczu na sankcjonowanym turnieju. Warto przyswoić sobie omawiane tu czynności i starać się je stosować także podczas luźnych form rozgrywek, gdyż ukształtowane w ten sposób nawyki na pewno zaprocentują, jeśli po pewnym czasie zdecydujesz się na grę turniejową.

Na początku meczu obaj gracze ustalają w sposób losowy (np. poprzez rzut kostką), który z nich będzie wykonywał swoje działania jako pierwszy. Większość talii chce się poruszać jako pierwsza, ale wygrywający rzut kostką ma prawo zadecydować inaczej i pozwolić zacząć przeciwnikowi.

[O graczu, który porusza się w danej partii jako pierwszy często mówi się, że jest na play, a o poruszającym się po nim rywalu mówimy, że jest na draw. Wynika to z faktu, iż w celu zrównoważenia przewagi jaką ma gracz rozpoczynający rozgrywkę nie dobiera on karty na początku swojej pierwszej kolejki, tylko od razu przechodzi do gry.  Ponadto gracza, którego tura trwa w danym momencie nazywamy aktywnym graczem, a jego rywala graczem nieaktywnym.]

Następnie gracze tasują swoje decki i przekazują przeciwnikowi do potasowania, a po ich odebraniu, dobierają po siedem kart z góry swoich bibliotek. Jeżeli któryś z graczy jest niezadowolony ze swojej ręki startowej może ją wymienić poprzez zadeklarowanie chęci wzięcia mulligana. Biorąc mulligana wtasowujemy niezadowalającą siódemkę do talii, po czym tasujemy i dajemy ją do ponownego przetasowania również przeciwnikowi. Po odebraniu przetasowanego decka z góry biblioteki dobieramy sześć kart. Jeśli i ta szóstka nie spełnia naszych oczekiwań możemy powtórzyć całą procedurę, jednakże za każdym razem dobierając o jedną kartę mniej niż poprzednio.

Kiedy obaj gracze zdecydują się zachować (keepnąć) swoje ręce rozpoczyna się właściwa rozgrywka. Gracz, który jako pierwszy zdoła sprowadzić życie przeciwnika z 20 punktów do zera zostaje zwycięzcą pierwszej gry. Przegrany ma prawo zadecydować kto rozpocznie kolejną partię. Mecz toczy się do dwóch wygranych gier.  Po każdej grze zawodnicy mają możliwość skorzystania ze swoich sideboardów (talii pobocznych). Sideoboarding w constructed odbywa się wg zasady karta za kartę (karty muszą być wymieniane w stosunku 1:1), sideboarding w limited ma tylko jedno ograniczenie - talia musi mieć minimum 40 kart. Typowy czas na rozegranie jednej partii (rundy) na turnieju to 50 minut.

[W Mtg istnieją alternatywne sposoby na wygranie partii. Poza przegraną spowodowaną utratą wszystkich swoich punktów życia, gracz ponosi porażkę jeśli skończą mu się karty w bibliotece (nie może dobrać karty) oraz kiedy zostanie mu zadane 1o ran od kreatur posiadających keyword Infect i/lub Poisonous. Wąska grupa kart takich jak Door to Nothingness czy Battle of Wits potrafi wygrywać gry sama z siebie, ale jak widać warunki takiej wygranej są dość trudne do zrealizowania.]

W trakcie gry w sankcjonowanym turnieju obaj gracze odpowiadają za prawidłowy przebieg i tempo rozgrywania partii. Dotyczy to zarówno stanu odpisywanych punktów życia, monitorowania koloru oraz ilości wydawanej many, jaki i wartości parametrów znajdujących się w grze permanentów. Im wyższa jest ranga turnieju, w którym uczestniczysz, tym lepszej znajomości zasad wymagają od Ciebie sędziowie i tym większe nakładają kary za ich łamanie. Na lokalnych turniejach, gdzie gra się toczy o kilka boosterów i promkę sędziowie są znacznie bardziej pobłażliwi niż na dużych międzynarodowych imprezach. Za drobne uchybienie zasadom sędziowie mogą upominać graczy za pomocą warningów. Poważniejsze naruszenia regulaminu mogą się skończyć game lossem (przegrana w grze) albo match lossem (przegrana w partii). Za oszukiwanie albo niesportowe zachowanie gracz zwykle zostaje zdyskwalifikowany (dq). Jeśli oszukiwał w jakiś wyjątkowo cyniczny i zaplanowany sposób (np. znaczył karty), to może go spotkać czasowy, a w sytuacjach skrajnych nawet dożywotni zakaz występowania na turniejach Mtg (tzw. ban).

</h4>
            </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'Rules',
}
</script>
