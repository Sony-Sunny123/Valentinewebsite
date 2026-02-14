// Global function for Start button
function goToPage2() {
    window.location.href = "page2.html";
}
// Global function for "Start Love Quiz" button
function goToQuiz() {
    window.location.href = "quiz.html";
}

// Floating hearts (works on all pages)
function createHeart() {
    const heart = document.createElement("div");
    heart.classList.add("heart");
    const hearts = ["💖", "💕", "💘", "💗"];
    heart.innerHTML = hearts[Math.floor(Math.random() * hearts.length)];
    heart.style.left = Math.random() * 100 + "vw";
    heart.style.animationDuration = (Math.random() * 2 + 4) + "s";
    document.body.appendChild(heart);
    setTimeout(() => heart.remove(), 6000);
}
setInterval(createHeart, 50);

// Page 2 NO button logic + celebration
document.addEventListener("DOMContentLoaded", function () {

    const yesBtn = document.getElementById("yesBtn");
    const noBtn = document.getElementById("noBtn");
    const popup = document.getElementById("popup");

    if (yesBtn && noBtn) {
        // YES hover → show NO
        yesBtn.addEventListener("mouseover", function () {
            const rect = yesBtn.getBoundingClientRect();
            noBtn.style.display = "block";
            noBtn.style.position = "absolute";
            noBtn.style.left = rect.right + 20 + "px";
            noBtn.style.top = rect.top + "px";
        });

        // NO moves away
        noBtn.addEventListener("mouseover", function () {
            const x = Math.random() * (window.innerWidth - 120);
            const y = Math.random() * (window.innerHeight - 60);
            noBtn.style.left = x + "px";
            noBtn.style.top = y + "px";
        });

        // YES clicked → popup + celebration
        yesBtn.addEventListener("click", function () {
            popup.style.display = "block";
            startCelebration();
        });
    }

    // Slideshow logic (if exists)
    if (document.getElementsByClassName("slide").length > 0) {
        let slideIndex = 0;
        function showSlides() {
            const slides = document.getElementsByClassName("slide");
            for (let i = 0; i < slides.length; i++) slides[i].style.display = "none";
            slideIndex++;
            if (slideIndex > slides.length) slideIndex = 1;
            slides[slideIndex - 1].style.display = "block";
            setTimeout(showSlides, 3000);
        }
        showSlides();
    }

    // QUIZ LOGIC (if exists)
    const questionElement = document.getElementById("question");
    const answersElement = document.getElementById("answers");
    const nextBtn = document.getElementById("nextBtn");

    if (questionElement && answersElement && nextBtn) {

        const questions = [
            { question: "What is my favorite color? 💕", answers: ["Red", "Blue", "Black", "Pink"], correct: 3 },
            { question: "What food do I love the most? 🍕", answers: ["Pizza", "Burger", "Pasta", "Biryani"], correct: 0 },
            { question: "What do I call you most often? 😏", answers: ["Baby", "Darling", "Achayoo", "Love"], correct: 2 }
        ];

        let currentQuestion = 0;
        let score = 0;

        function showQuestion() {
            const q = questions[currentQuestion];
            questionElement.textContent = q.question;
            answersElement.innerHTML = "";

            q.answers.forEach((answer, index) => {
                const btn = document.createElement("button");
                btn.textContent = answer;
                btn.addEventListener("click", function () {
                    if (index === q.correct) score++;
                    nextBtn.style.display = "inline-block";
                });
                answersElement.appendChild(btn);
            });
        }

        nextBtn.addEventListener("click", function () {
            currentQuestion++;
            if (currentQuestion < questions.length) {
                showQuestion();
                nextBtn.style.display = "none";
            } else {
                showResult();
            }
        });

        function showResult() {
            let gift = "";
            if (score === questions.length) gift = "Gadget";
            else if (score >= 2) gift = "Dress";
            else gift = "Chocolate";

            localStorage.setItem("selectedGift", gift);

            questionElement.innerHTML = `You scored ${score} / ${questions.length} 💖`;

            if (score === questions.length) {
                answersElement.innerHTML = "<h3>You know me perfectly 😘💘</h3>";
            } else if (score >= 2) {
                answersElement.innerHTML = "<h3>Not bad… but you need to love me more 😜💕</h3>";
            } else {
                answersElement.innerHTML = "<h3>Ohhh nooo 😭 you need more training!</h3>";
            }

            nextBtn.style.display = "none";

            // Optional: hearts while showing result
            for (let i = 0; i < 50; i++) createHeart();

            setTimeout(() => window.location.href = "gift.html", 3000);
        }

        showQuestion();
    }

});

// Celebration crackers
function startCelebration() {
    const colors = ["#ff2e63","#ffcc00","#00f2ff","#ff66b2","#8a2be2","#00ff7f","#ff4500","#00bfff","#ff1493","#7fff00","#ffd700","#ff69b4"];
    for (let i = 0; i < 200; i++) {
        const cracker = document.createElement("div");
        cracker.classList.add("cracker");
        cracker.style.left = Math.random() * 100 + "vw";
        const size = Math.random() * 10 + 5;
        cracker.style.width = size + "px";
        cracker.style.height = size + "px";
        cracker.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        cracker.style.animationDuration = (Math.random() * 3 + 2) + "s";
        document.body.appendChild(cracker);
        setTimeout(() => cracker.remove(), 5000);
    }
}
purchaseBtn.addEventListener("click", function() {
    if (gift === "Gadget") {
    window.open("https://www.amazon.com/gp/browse.html?node=172282", "_blank"); // Electronics category
} else if (gift === "Chocolate") {
    window.open("https://www.amazon.com/s?k=chocolate+gifts", "_blank"); // Chocolate gifts search
} else if (gift === "Dress") {
    window.open("https://www.myntra.com/tshirts", "_blank");
}

    // Open the store in a new tab
    window.open(url, "_blank");

    // Show a message on your page
    giftMessage.textContent = "Happy shopping! 💖";
    giftNote.textContent = "After you purchase, come back and hug me! 😘";
    purchaseBtn.style.display = "none";

});
